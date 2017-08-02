DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INTEGER(30) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL (4,2) default 0,
  stock_quantity INTEGER(30) default 0,
  PRIMARY KEY (id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Late Show", "Books", 12.99, 10),("The Whistler", "Books", 9.99, 10),("Camino Island", "Books", 11.99, 10),
("House of Spies", "Books", 10.99, 10),("Beautiful Mistake", "Books", 14.99, 10),("The Woman in Cabin 10", "Books", 13.99, 10),
("A Game of Thrones", "Books", 15.99, 10),("The Handmaid's Tale", "Books", 14.99, 10),("The Gunslinger", "Books", 12.99, 10),
("Milk and Honey", "Books", 16.99, 10);
