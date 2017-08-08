var mysql = require('mysql');
var Table = require('cli-table');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

//connect to mysql database and begin application by running managerView function
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
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

  connection.query('SELECT * FROM Products', function(err, res) {
    var table = new Table({
      head: ['ID Number', 'Product', 'Department', 'Price', 'Quantity Available']
    });
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].id, res[i].ProductName, res[i].DepartmentName,res[i].Price, res[i].StockQuantity]);
    }
    console.log(JSON.parse(table));
    cb();
  })
}

// View items that are low on inventory, specifically items that have a count lower than five.
function viewLowInventory(cb) {
  connection.query('SELECT * FROM Products WHERE StockQuantity < 5',
    function(err, res) {
      if (err) throw err;
      if (res.length === 0) {
        console.log('There are no items with low inventory.');
        cb();
      } else {
        var table = new Table({
          head: ['ID Number', 'Product', 'Department', 'Price', 'Quantity Available']
        });
        for (var i = 0; i < res.length; i++) {
          table.push([res[i].id, res[i].ProductName, res[i].DepartmentName,res[i].Price, res[i].StockQuantity]);
        }
        console.log(table.toString());
        console.log('These items are running low.');
        cb();
      }
    });
}

// Function that creates a prompt that will let the manager add more of any item.
function addToInventory() {
  var items = [];
  connection.query('SELECT ProductName FROM products', function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++)
      items.push(res[i].ProductName)
    })
    inquirer.prompt([{
      name: 'choices',
      type: 'checkbox',
      message: 'Which products would you to add more of?',
      choices: items
    }]).then(function(user) {
      if (user.choices.length === 0) {
        console.log('Error!');
        managerView();
      } else {
        howMany(user.choices);
      }
    });
  };


// Function to add specific units to inventory
function howMany(itemNames) {
  var item = itemNames.shift();
  var itemStock;
  connection.query('SELECT StockQuantity FROM Products WHERE ?', {
    ProductName: item
  }, function(err, res) {
    if (err) throw err;
    itemStock = res[0].StockQuantity;
    itemStock = parseInt(itemStock)
  });
  inquirer.prompt([{
    name: 'amount',
    type: 'text',
    message: 'How many ' + item + ' would you like to add?',
    validate: function(str) {
      if (isNaN(parseInt(str))) {
        console.log('Error');
        return false;
      } else {
        return true;
      }
    }
  }]).then(function(user) {
    var amount = user.amount
    amount = parseInt(amount);
    connection.query('UPDATE Products SET ? WHERE ?', [{
        StockQuantity: itemStock += amount
      },
      {
        ProductName: item
      }
    ], function(err) {
      if (err) throw err;
    });
    if (itemNames.length != 0) {
      howMany(itemNames);
    } else {
      console.log('Inventory has been updated.');
      managerView();
    }
  });
}

//function to add a new product to the Products table
function addNewProduct() {
  var departments = [];
  connection.query('SELECT DepartmentName FROM Departments', function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      departments.push(res[i].DepartmentName);
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
      message: 'Which department does this item belong to?'
      // choices: departments
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
      ProductName: user.item,
      DepartmentName: user.department,
      Price: user.price,
      StockQuantity: user.stock
    }
    connection.query('INSERT INTO Products SET ?', item,
      function(err) {
        if (err) throw err;
        console.log(item.ProductName + ' has been added to the inventory.');
        managerView();
      });
  });
}
