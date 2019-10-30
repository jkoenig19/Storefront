DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  product_sales DECIMAL(10,2) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Baseball", "Sports", 10, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Football", "Sports", 25, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Basketball", "Sports", 20, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tent", "Outdoors", 50, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kayak", "Outdoors", 200, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Skis", "Sports", 100, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bike", "Sports", 50,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Treadmill", "Exercise", 400, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Golf club", "Sports", 10, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tennis ball", "Sports", 5, 100);

SELECT * FROM products;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NULL,
  over_head_costs DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Sports", 400);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Outdoors", 500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Exercise", 100);

SELECT * FROM departments;
