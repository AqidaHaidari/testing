const Product = require('../models/product.model')

class ProductService {
    static async getProductById(productId) {
        try{
         const product = await Product.findById(productId);
         return product;
        }catch(err){
            throw err;
        }

    }
}

module.exports = ProductService;