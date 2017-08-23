var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

var inventoryAdd = [];

//connect to mysql database and begin application by running managerView function
connection.connect(function(err) {
    if (err) throw err;
    managerView();
});

//prompt the user to select an option using Inquirer.prompt
function managerView(){
  inquirer.prompt([
    {
    name: 'choice',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View Products For Sale', 'View Low Inventory', 'Add To Inventory', 'Add New Product', 'Exit']
    }
  ]).then(function(user){
    console.log(user.choice);
    switch(user.choice) {
          case 'View Products For Sale':
              viewProducts(function(){
                managerView();
              });
          break;

          case 'View Low Inventory':
              viewLowInventory(function(){
                managerView();
              });
          break;

          case 'Add To Inventory':
              addToInventory();
          break;

          case 'Add New Product':
              addNewProduct();
          break;

          case 'Exit':
              connection.end();
          break;
      }
    });
}

// List every available item including id, names, prices and quantities.
function viewProducts() {

  connection.query('SELECT * FROM products', function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log([res[i].id, res[i].product_name, res[i].department_name,res[i].price, res[i].stock_quantity]);
      // console.log(res[i]);
    }
})
}

// View items that are low on inventory, specifically items that have a count lower than five.
function viewLowInventory() {
  connection.query('SELECT * FROM products WHERE stock_quantity < 5',
    function(err, res) {
      if (err) throw err;
      if (res.length === 0) {
        console.log('There are no items with low inventory.');
        // cb();
      } else {
        for (var i = 0; i < res.length; i++) {
          console.log([res[i].id, res[i].product_name, res[i].department_name,res[i].price, res[i].stock_quantity]);
        }
        console.log('These items are running low.');
      }
    });
}
// Function that creates a prompt that will let the manager add more of any item.
function addToInventory() {
  inquirer.prompt([{
          name: 'choices',
          type: 'input',
          message: 'Which item by ID number, would you like to add more of?',
        },
        {
          name: 'amount',
          type: 'text',
          message: 'How many ' + item + ' would you like to add?'
        }

  ]).then(function(user) {
      // console.log(user.choices);
      if (user.choices.length === 0 && user.amount) {
        console.log('Error!');
        managerView();
      } else {
        connection.query("UPDATE Products SET stock_quantity = (stock_quantity + ?);", function(err,result){
          if(err) console.log('error ' + err);

        connection.query('SELECT * FROM products WHERE id = ?',user.choices, function(err, res) {
          console.log('');
          console.log('The new updated units for id# '+ inventoryAdd[0].id+ ' is ' + resOne[0].stock_quantity);
          console.log('');
          // howMany(user.choices);
          // for (var i = 0; i < res.length; i++){
          //   items.push(res[i].id)
          // }

        })
        .query('INSERT ')
      })
    };
  });


// Function to add specific units to inventory
// function howMany(itemNames) {
//   var item = itemNames.shift();
//   var itemStock;
//   connection.query('SELECT stock_quantity FROM products WHERE ?', {
//     id: item
//   }, function(err, res) {
//     if (err) throw err;
//     itemStock = res[0].stock_quantity;
//     itemStock = parseInt(itemStock)
//   });
//   inquirer.prompt([{
//     name: 'amount',
//     type: 'text',
//     message: 'How many ' + item + ' would you like to add?',
//     validate: function(str) {
//       if (isNaN(parseInt(str))) {
//         console.log('Error');
//         return false;
//       } else {
//         return true;
//       }
//     }
//   }]).then(function(user) {
//     var amount = user.amount
//     amount = parseInt(amount);
//     connection.query('INSERT products SET ?', [{
//         stock_quantity: itemStock += amount
//       },
//       {
//         id: item
//       }
//     ], function(err) {
//       if (err) throw err;
//     });
//     if (itemNames.length != 0) {
//       howMany(itemNames);
//     } else {
//       console.log('Inventory has been updated.');
//       managerView();
//     }
//   });
// }

//function to add a new product to the Products table
function addNewProduct() {
  var departments = [];
  connection.query('SELECT department_name FROM products', function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      departments.push(res[i].department_name);
    }
  });
  inquirer.prompt([{
      name: 'item',
      type: 'text',
      message: 'What is the name of the item you would like to add?'
    },
    {
      name: 'department',
      type: 'list',
      message: 'Which department does this item belong to?',
      choices: departments
    },
    {
      name: 'price',
      type: 'text',
      message: 'What is the price of this item?'
    },
    {
      name: 'stock',
      type: 'text',
      message: 'How many units of this item do we have in stock currently?'
    }
  ]).then(function(user) {
    var item = {
      product_name: user.item,
      department_name: user.department,
      price: user.price,
      stock_quantity: user.stock
    }
    connection.query('INSERT INTO Products SET ?', item,
      function(err) {
        if (err) throw err;
        console.log(item.product_name + ' has been added to the inventory.');
        managerView();
      });
  });
}
}
