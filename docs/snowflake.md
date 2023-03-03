### Create trial account


Use following link: https://docs.snowflake.com/user-guide/admin-trial-account


### Create schemas and databases

Upon creation of trial account snowflake will add `SNOWFLAKE_SAMPLE_DATA` with multiple tables and databases. This one is the best for use.
If it's not present - next scripts can be utilized.



```sql

-- create database
CREATE DATABASE testdatabase;

-- create schema 1
CREATE SCHEMA customers;
CREATE TABLE customers.customer_info (
    customer_id INTEGER,
    name VARCHAR(50),
    email VARCHAR(50),
    address VARCHAR(100)
);


-- create schema 2
CREATE SCHEMA sales;
CREATE TABLE sales.orders (
    order_id INTEGER,
    customer_id INTEGER,
    order_date DATE,
    order_total FLOAT
);
CREATE TABLE sales.products (
    product_id INTEGER,
    product_name VARCHAR(50),
    description VARCHAR(100),
    price FLOAT
);



-- create  schema 3
CREATE SCHEMA employees;
CREATE TABLE employees.employee_info (
    employee_id INTEGER,
    name VARCHAR(50),
    email VARCHAR(50),
    department VARCHAR(50)
);
CREATE TABLE employees.employee_salary (
    employee_id INTEGER,
    salary FLOAT,
    start_date DATE
);
```
