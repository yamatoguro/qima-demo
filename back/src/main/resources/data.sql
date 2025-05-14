-- Insert initial categories
MERGE INTO category (id_category, name) KEY(name) VALUES (1, 'Electronics');
MERGE INTO category (id_category, name) KEY(name) VALUES (2, 'Books');

-- Insert initial products
MERGE INTO product (id_product, name, price, available, description, category) KEY(name) VALUES
(1, 'Smartphone', 699.99, TRUE, 'Latest model smartphone', 1);
MERGE INTO product (id_product, name, price, available, description, category) KEY(name) VALUES
(2, 'Laptop', 1299.99, TRUE, 'High-performance laptop', 1);
MERGE INTO product (id_product, name, price, available, description, category) KEY(name) VALUES
(3, 'Tablet', 499.99, TRUE, 'Portable tablet device', 1);
MERGE INTO product (id_product, name, price, available, description, category) KEY(name) VALUES
(4, 'Smartwatch', 199.99, TRUE, 'Wearable smartwatch', 1);
MERGE INTO product (id_product, name, price, available, description, category) KEY(name) VALUES
(5, 'Headphones', 99.99, TRUE, 'Noise-cancelling headphones', 1);
MERGE INTO product (id_product, name, price, available, description, category) KEY(name) VALUES
(6, 'Camera', 899.99, TRUE, 'High-resolution digital camera', 1);
MERGE INTO product (id_product, name, price, available, description, category) KEY(name) VALUES
(7, 'E-Reader', 129.99, TRUE, 'E-book reader device', 2);
MERGE INTO product (id_product, name, price, available, description, category) KEY(name) VALUES
(8, 'Novel', 19.99, TRUE, 'Bestselling novel', 2);
MERGE INTO product (id_product, name, price, available, description, category) KEY(name) VALUES
(9, 'Textbook', 59.99, TRUE, 'Educational textbook', 2);
MERGE INTO product (id_product, name, price, available, description, category) KEY(name) VALUES
(10, 'Cookbook', 29.99, TRUE, 'Recipe cookbook', 2);
MERGE INTO product (id_product, name, price, available, description, category) KEY(name) VALUES
(11, 'Biography', 24.99, TRUE, 'Inspirational biography', 2);
MERGE INTO product (id_product, name, price, available, description, category) KEY(name) VALUES
(12, 'Comic Book', 14.99, TRUE, 'Popular comic book', 2);
MERGE INTO product (id_product, name, price, available, description, category) KEY(name) VALUES
(13, 'Graphic Novel', 29.99, TRUE, 'Illustrated graphic novel', 2);

-- Insert initial roles
MERGE INTO role (id, name) KEY(name) VALUES (1, 'ADMIN');
MERGE INTO role (id, name) KEY(name) VALUES (2, 'USER');