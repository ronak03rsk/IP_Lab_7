const express = require('express')
const path = require('path')
const app = express()
const { products } = require('./data')

app.use(express.static(path.join(__dirname, 'public')))  // Add this to serve static files

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')) // Serve an HTML file
})

app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product
    return { id, name, image }
  })
  res.json(newProducts)
})

app.get('/api/products/:productID', (req, res) => {
  const { productID } = req.params
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  )
  if (!singleProduct) {
    return res.status(404).send('Product Does Not Exist')
  }
  res.json(singleProduct)
})

app.listen(5000, () => {
  console.log('Server is listening on port 5000....')
})
