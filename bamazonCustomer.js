var mysql = require("mysql");
var inquirer = require("inquirer");

var new_quantity = 0;
var total_purchase = 0;

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "yourRootPassword",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    listInventory();
});

function listInventory(){
  connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log("Item ID | Product Name | Price");
      for (var i=0; i<res.length;i++){
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
      }
      console.log("");
      customerInput();
    });
};

function customerInput(){
  inquirer.prompt([
    {
      type: "input",
      name: "product",
      message: "Welcome! What is the Item ID of the product you would like to buy?"
    },
    {
      type: "input",
      name: "quantity",
      message: "How many units of this product would you like to buy?"
    }
  ]).then(function(response) {
    connection.query("SELECT * FROM products WHERE ?", {item_id: parseInt(response.product)}, function(err, res) {
      if (err) throw err;
      if (res[0].stock_quantity >= parseInt(response.quantity)){
        new_quantity = res[0].stock_quantity - parseInt(response.quantity);
        total_purchase = res[0].price * parseInt(response.quantity);
        completePurchase(response);
      }
      else {
        console.log("\nInsufficient quantity in stock!\n");
        listInventory();
      }
    });
  });
};

function completePurchase(response){
  connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: new_quantity},{item_id: parseInt(response.product)}], function(err, res) {
      if (err) throw err;
      console.log("\nTotal purchase: $" + total_purchase);
  connection.end();
  });
};