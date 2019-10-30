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
            choices: ["View Products Sales by Department","Create New Department"]
        }
    ]).then(function(response) {
        if (response.menu === "View Products Sales by Department"){
            productSales();
        }
        else {
            newDepartment();
        }
    });
};

function productSales(){
    connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, combo.prod_sales, combo.total_profit FROM departments INNER JOIN (SELECT departments.department_name, prod.sales AS prod_sales, SUM(prod.sales - departments.over_head_costs) AS total_profit FROM departments INNER JOIN (SELECT department_name, SUM(product_sales) AS sales FROM products GROUP BY department_name) AS prod ON (departments.department_name = prod.department_name) GROUP BY departments.department_name) AS combo ON (departments.department_name = combo.department_name)", function(err, res) {
        if (err) throw err;
        console.log("\n| department_id | department_name | over_head_costs | product_sales | total_profit |");
        console.log("| ------------ | --------------- | --------------- | ------------- | ------------ |")
        for (var i=0; i<res.length;i++){
            console.log("| " + res[i].department_id + "         | " + res[i].department_name + "         | " + res[i].over_head_costs + "         | " + res[i].prod_sales + "         | " + res[i].total_profit + "         |");
        };
        console.log("");
        connection.end();
    });
};

function newDepartment(){
    inquirer.prompt([
        {
            type: "input",
            name: "newDepartmentName",
            message: "What is the name of the new department?",
        },
        {
            type: "input",
            name: "newOverHeadCosts",
            message: "What is the Over Head Costs for the new department?",
        }
    ]).then(function(response) {
        connection.query("INSERT INTO departments SET ?", {
            department_name: response.newDepartmentName,
            over_head_costs: response.newOverHeadCosts
        }, function(err, res) {
            if (err) throw err;
            console.log("\n" + res.affectedRows + " new department has been added!\n");
            connection.end();
        });
    });
};