import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

// Create an Express application
const app = express();
const port = 1245;

// Connect to Redis
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

// Product data
const listProducts = [
  { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
  { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
  { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
  { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

// Function to get item by id
function getItemById(id) {
  return listProducts.find(product => product.id === id);
}

// Function to reserve stock by id in Redis
function reserveStockById(itemId, stock) {
  return setAsync(`item.${itemId}`, stock);
}

// Async function to get current reserved stock by id from Redis
async function getCurrentReservedStockById(itemId) {
  const stock = await getAsync(`item.${itemId}`);
  return stock;
}

// Route to list all products
app.get('/list_products', (req, res) => {
  res.json(listProducts.map(({ id, name, price, stock }) => ({
    itemId: id,
    itemName: name,
    price,
    initialAvailableQuantity: stock
  })));
});

// Route to get product details by id
app.get('/list_products/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);
  if (!product) {
    return res.status(404).json({ status: 'Product not found' });
  }
  const currentStock = await getCurrentReservedStockById(itemId) || product.stock;
  res.json({ ...product, currentQuantity: currentStock });
});

// Route to reserve a product
app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const product = getItemById(itemId);
  if (!product) {
    return res.status(404).json({ status: 'Product not found' });
  }
  const currentStock = await getCurrentReservedStockById(itemId) || product.stock;
  if (currentStock < 1) {
    return res.json({ status: 'Not enough stock available', itemId });
  }
  await reserveStockById(itemId, currentStock - 1);
  res.json({ status: 'Reservation confirmed', itemId });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
