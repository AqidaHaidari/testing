const Product = require("../models/product.model");
const ProductService = require('../services/product.servece')

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};


const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductService.getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};


const createProduct = async (req, res) => {
    try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};


const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};


const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
 
};