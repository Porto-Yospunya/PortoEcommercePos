USE ecommerce_store;

CREATE TABLE stores (
  id BINARY(16) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  logo VARCHAR(255),
  tax_id VARCHAR(20),
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  owner_id BINARY(16) NOT NULL
);

CREATE TABLE organizations (
  id BINARY(16) PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  type ENUM('school', 'hospital', 'government', 'company', 'other'),
  tax_id VARCHAR(20),
  contact_name VARCHAR(100),
  contact_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id BINARY(16) PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  full_name VARCHAR(100),
  image VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'customer', 'cashier') DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  organization_id BINARY(16),
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

ALTER TABLE stores
ADD CONSTRAINT fk_stores_user
FOREIGN KEY (owner_id) REFERENCES users(id);

CREATE TABLE user_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL,
  setting_value text,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  user_id BINARY(16) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  phone VARCHAR(20),
  line1 VARCHAR(100),
  line2 VARCHAR(100),
  sub_district VARCHAR(100),
  district VARCHAR(100),
  province VARCHAR(100),
  postal_code VARCHAR(10),
  country VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id BINARY(16),
  organization_id BINARY(16),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN Key (organization_id) REFERENCES organizations(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE products (
  id BINARY(16) PRIMARY KEY,
  sku VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL UNIQUE,
  image VARCHAR(255),
  description TEXT,
  stock INT DEFAULT 0,
  stock_min INT DEFAULT 0,
  price DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  unit_id INT NOT NULL,
  category_id INT NOT NULL
);

CREATE TABLE units (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  name VARCHAR(100) NOT NULL UNIQUE
);

ALTER TABLE products
ADD CONSTRAINT fk_products_category
FOREIGN KEY (category_id) REFERENCES categories(id);

ALTER TABLE products
ADD CONSTRAINT fk_products_unit
FOREIGN KEY (unit_id) REFERENCES units(id);

CREATE TABLE orders (
  id BINARY(16) PRIMARY KEY,
  receipt_id VARCHAR(50) NOT NULL UNIQUE,
  status ENUM('pending', 'paid', 'shipped', 'cancelled') DEFAULT 'pending',
  total DECIMAL(10, 2) NOT NULL,
  channel ENUM('web', 'pos') NOT NULL,
  discount DECIMAL(10, 2) DEFAULT 0.00,
  vat_rate DECIMAL(5, 2) DEFAULT 7.00,
  vat_amount DECIMAL(10, 2) DEFAULT 0.00,
  is_tax_invoice BOOLEAN DEFAULT FALSE,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by BINARY(16),
  customer_id BINARY(16),
  organization_id BINARY(16),
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (customer_id) REFERENCES users(id),
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

CREATE TABLE order_items (
  unit_price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL,
  order_id BINARY(16) NOT NULL,
  product_id BINARY(16) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (order_id, product_id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE cart (
  id BINARY(16) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  customer_id BINARY(16) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADEx
);

CREATE TABLE cart_items (
  quantity INT DEFAULT 1,
  cart_id BINARY(16) NOT NULL,
  product_id BINARY(16) NOT NULL,
  PRIMARY KEY (cart_id, product_id),
  FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE payments (
  id BINARY(16) PRIMARY KEY,
  ref_code VARCHAR(100),
  payment_methods ENUM('cash', 'credit_card', 'qr_payment') DEFAULT 'cash',
  paid_amount DECIMAL(10, 2),
  payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
  paid_date DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  order_id BINARY(16) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE stock_received (
  id BINARY(16) PRIMARY KEY,
  ref_code VARCHAR(50) NOT NULL UNIQUE,
  received_date DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by BINARY(16) NOT NULL,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE TABLE stock_received_items (
  quantity INT NOT NULL,
  unit_cost DECIMAL(10, 2) NOT NULL,
  stock_received_id BINARY(16) NOT NULL,
  product_id BINARY(16) NOT NULL,
  PRIMARY KEY (stock_received_id, product_id),
  FOREIGN KEY (stock_received_id) REFERENCES stock_received(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE order_returns (
  id BINARY(16) PRIMARY KEY,
  return_reason text,
  return_status ENUM('requested', 'approve', 'rejected', 'completed') DEFAULT 'requested',
  refund_amount DECIMAL(10, 2) DEFAULT 0.00,
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  processed_at DATETIME,
  order_id BINARY(16),
  FOREIGN KEY (order_id) REFERENCES orders(id)
);

CREATE TABLE order_return_items (
  quantity INT NOT NULL,
  return_id BINARY(16) NOT NULL,
  product_id BINARY(16) NOT NULL,
  PRIMARY KEY (return_id, product_id),
  FOREIGN KEY (return_id) REFERENCES order_returns(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE logs (
  id BINARY(16) PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  action VARCHAR(100) NOT NULL,
  target_table VARCHAR(100) NOT NULL,
  target_id BINARY(16) NOT NULL,
  data JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  user_id BINARY(16),
  organization_id BINARY(16),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);
