import httpClient from '../services/httpClient'

const getProducts = async () => httpClient.get('/products?select=*')
const getDetailProduct = async (id) => httpClient.get(`/products?id=eq.${id}&select=*`)
const createProduct = async (body) => httpClient.post(`/products`, body, { headers: {
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal',
}})
const updateProduct = async (id, body) => httpClient.patch(`/products?id=eq.${id}`, body, { headers: {
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal',
}})
const deleteProduct = async (id) => httpClient.delete(`/products?id=eq.${id}`)

export {
    getProducts,
    getDetailProduct,
    createProduct,
    updateProduct,
    deleteProduct
}