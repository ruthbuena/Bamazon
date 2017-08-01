var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  showAll();
  buyItem();
});

// function which prompts the user for what action they should take
function showAll() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // console.log(res);
  });
}

function buyItem() {
  inquirer
    .prompt([{
        name: "item_id",
        type: "input",
        message: "What is the ID of the product you would like to buy?"
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "How many units of the item would you like to buy?"
      },
    ])
    .then(function(input) {
      // console.log('input')
      var item = input.item_id;
      var quantity = input.stock_quantity;

      var queryItem = 'SELECT * FROM products WHERE ?';

      connection.query(queryItem, {
        item_id: item
      }, function(err, data) {
        if (err) throw err;

        if (data.length == 0) {
          console.log('ERROR: This item ID is not available.');
          remainingInventory();
        } else {
          var productData = data[0];

          if (quantity <= productData.stock_quantity) {
            console.log('Your order is being placed now.');

            var currentInventory = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + 'WHERE item_id = ' + item;

            connection.query(currentInventory, function(err, data) {
              if (err) throw err;

              console.log('Your order has been placed!');
              connection.end();
            })
          } else {
            console.log('Insufficient quantity! We do not have enough inventory to fulfill your order.');

            remainingInventory();
          }
        }
      })
    })
}


function remainingInventory() {
  queryItem = 'SELECT * FROM products ';

  connection.query(queryItem, function(err, data) {
    if (err) throw err;
  })
}

function beginAmazon() {
  remainingInventory();
}

beginAmazon();
