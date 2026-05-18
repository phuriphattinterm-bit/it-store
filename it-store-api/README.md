# 🛒 IT Store API

A backend service for an IT hardware and electronics store, built with NestJS, TypeScript, Node.js, and TypeORM. This application manages the store's product catalog.

## 📦 Tech Stack

* **Framework:** NestJS
* **Language:** TypeScript
* **ORM:** TypeORM
* **Database:** MySQL

## 🗄️ Database Schema

The database relies on the following primary entity:

### `product`
Stores the catalog of available IT hardware and accessories.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | Primary Key | Auto-generated unique identifier |
| `name` | varchar(120) | Name of the product |
| `description` | varchar(120) | Brief description of the item |
| `price` | decimal(10,2)| Cost of the product |
| `imageUrl` | varchar(500)| URL to the product's image (Nullable) |

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+ recommended)
* A running MySQL Database instance

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd it-store-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your database connection:
   Create a `.env` file in the root directory and update it with your local MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_database_password_here
   DB_NAME=itstore
   ```

### Running the Application

To start the server in development mode:
```bash
npm run start:dev
```

## 💾 SQL Simulation Data

If you need to manually create the table and populate it with seed data for testing, run the following SQL commands in your database client.

```sql
-- --------------------------------------------------------
-- Table Structure for 'product'
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description VARCHAR(120) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    imageUrl VARCHAR(500) DEFAULT NULL
);

-- --------------------------------------------------------
-- Seed Data for 'product' table
-- --------------------------------------------------------

INSERT INTO product (name, description, price, imageUrl) 
VALUES 
(
    'Mechanical Keyboard Pro', 
    'Tactile mechanical switches with RGB backlighting.', 
    129.99, 
    '[https://example.com/images/mech-keyboard.jpg](https://example.com/images/mech-keyboard.jpg)'
),
(
    'UltraWide Gaming Monitor', 
    '34-inch curved 144Hz 1ms gaming monitor.', 
    499.50, 
    '[https://example.com/images/ultrawide-monitor.jpg](https://example.com/images/ultrawide-monitor.jpg)'
),
(
    'Wireless Ergonomic Mouse', 
    'Comfortable 2.4GHz wireless mouse with adjustable DPI.', 
    45.00, 
    '[https://example.com/images/ergo-mouse.jpg](https://example.com/images/ergo-mouse.jpg)'
),
(
    '1TB NVMe SSD', 
    'High-speed PCIe Gen4 NVMe solid state drive.', 
    89.99, 
    NULL
),
(
    'Developer Laptop 15-inch', 
    '32GB RAM, 1TB SSD, 14-core processor.', 
    1499.00, 
    '[https://example.com/images/dev-laptop.jpg](https://example.com/images/dev-laptop.jpg)'
);
```
