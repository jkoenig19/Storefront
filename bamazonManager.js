var mysql = require("mysql");
var inquirer = require("inquirer");

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
    menuOptions();
});

function menuOptions(){
    inquirer.prompt([
        {
            type: "list",
            name: "menu",
            message: "Welcome! Please select from the following menu options?",
            choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
        }
    ]).then(function(response) {
        if (response.menu === "View Products for Sale"){
            listInventory();
        }
        else if (response.menu === "View Low Inventory"){
            listLowInventory();
        }
        else if (response.menu === "Add to Inventory"){
            addInventory();
        }
        else {
            addNewProduct();
        }
    });
};

function listInventory(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("\nItem ID | Product Name | Price | Quantity");
        for (var i=0; i<res.length;i++){
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("");
        connection.end();
    });
  };

function listLowInventory(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    if (err) throw err;
    console.log("\nItem ID | Product Name | Price | Quantity");
    for (var i=0; i<res.length;i++){
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("");
    connection.end();
    });
};

function addInventory(){
    inquirer.prompt([
        {
            type: "input",
            name: "selectItemID",
            message: "Which Item ID would you like to increase the quantity for?",
        },
        {
            type: "input",
            name: "addQuantity",
            message: "How much do you want to increase the quantity by?",
        }
    ]).then(function(response) {
        connection.query("SELECT * FROM products WHERE ?", {item_id: response.selectItemID}, function(err, res) {
            if (err) throw err;
            var newQuantity = res[0].stock_quantity + parseInt(response.addQuantity);
            connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: newQuantity}, {item_id: response.selectItemID}], function(err, res) {
                if (err) throw err;
                console.log("\n" + res.affectedRows + " stock quantity has been updated!\n");
            connection.end();
            });
        });
    });
};

function addNewProduct(){
    inquirer.prompt([
        {
            type: "input",
            name: "newItemName",
            message: "What is the name of the new item?",
        },
        {
            type: "input",
            name: "newItemDepartment",
            message: "What department is the new item a part of?",
        },
        {
            type: "input",
            name: "newItemPrice",
            message: "What is the unit price for the new item?",
        },
        {
            type: "input",
            name: "newItemQuantity",
            message: "What is the quantity for the new item?",
        }
    ]).then(function(response) {
        connection.query("INSERT INTO products SET ?", {
            product_name: response.newItemName,
            department_name: response.newItemDepartment,
            price: response.newItemPrice,
            stock_quantity: response.newItemQuantity
        }, function(err, res) {
            if (err) throw err;
            console.log("\n" + res.affectedRows + " new item has been added!\n");
            connection.end();
        });
    });
};