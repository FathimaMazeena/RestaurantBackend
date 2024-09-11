const Product = require('../models/product.model');
const mongoose=require('mongoose');
const Category = require('../models/category.model');

const addProduct = async (req, res) => {
    try {
        const { categoryName, ...productDetails } = req.body;

        // Check if categoryName is provided and find the category
        if (categoryName) {
            const category = await Category.findOne({ name: categoryName });
            if (category) {
                productDetails.categoryId = category._id;
            } else {
                return res.status(400).json({ error: 'Invalid category name.' });
            }
        }

        let product = new Product({
            ...productDetails,
            price: parseFloat(productDetails.price),
            stockLevel: parseInt(productDetails.stockLevel)
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product.' });
    }
};

//Add new product
// const addProduct = async (req, res) => {
//     try {
//         const { categoryId, ...productDetails } = req.body;

//         //const category = await Category.findOne({ name: categoryId});
//         const category = await Category.findById(categoryId);

//         if (!category) {
//             return res.status(400).json({ error: "Invalid category name." });
//         }

//         let product = new Product({
//             ...productDetails,
//             categoryId: category._id,
//             price: parseFloat(productDetails.price),
//             stockLevel: parseInt(productDetails.stockLevel)
//         });

//         await product.save();
//         res.status(201).json(product);
//     } catch (error) {
//         console.error('Error creating product:', error);
//         res.status(500).json({ error: 'Failed to create product.' });
//     }
// };

// const addProduct = async (req, res) => {
//     const { productName, image, description, price, ingredients, categoryId, stockLevel } = req.body;

//     //const priceNumber = parseFloat(price);
//     //const stockLevelNumber = parseInt(stockLevel, 10);

//     // if (!mongoose.Types.ObjectId.isValid(categoryId)) {
//     //     return res.status(400).json({ message: 'Invalid category ID' });
//     // }

//     if (isNaN(price) || isNaN(stockLevel)) {
//         return res.status(400).json({ message: 'Price and stock level must be numbers' });
//     }

    

//     try {
//         const product = await Product.create({
//             productName,
//             image,
//             description,
//             price,
//             ingredients,
//             categoryId,
//             stockLevel
//         });
//         //res.status(201).json(product);
//         // Return a success response with the created product
//         res.status(201).json({
//             success: true, // Indicate success
//             message: 'Product created successfully',
//             product: product // Optionally include the product data in the response
//         });
//     } catch (error) {
//         console.error('Error creating product:', error); 
//         res.status(500).json({ message: 'Error creating product', error: error.message });
//     }
// };

//get products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);
    } catch (error) {

        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//get products for home page
const getProductPreview=async(req,res)=>{

    Product.find()
        .sort({ createdAt: -1 })
        .limit(4)
        .then(function(products) {
            res.send(products);
        })
        .catch(function(error) {
            res.status(500).json({ message: 'Error fetching products', error: error.message });
        });

};





//get a single product
const getProduct = async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
  
    try {
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      res.status(200).json(product);
    } catch (error) {

      console.error(error);
      return res.status(500).json({ error: 'An error occurred while retrieving the product' });
    }
  };
  

//delete a product
const deleteProduct= async(req, res)=>{
    const{id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No product found'});
    }  

    const product=await Product.findOneAndDelete({_id:id});

    if(!product){
        return res.status(400).json({error:'No product found'});
    }

    
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        product
    });


}


//update a product
const updateProduct= async (req, res)=>{

    const{id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No product found'});
    } 


    const product= await Product.findOneAndUpdate({_id:id},{
        ...req.body
    });

    if(!product){
        return res.status(400).json({error:'No product found'});
    }

    res.status(200).json(product);
    
}




module.exports = {
    addProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    getProductPreview
};
