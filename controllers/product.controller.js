const Product = require('../models/product.model');
const mongoose=require('mongoose');


//Add new product
const addProduct = async (req, res) => {
    const { name, image, description, price, ingredients, categoryId, stockLevel } = req.body;

    try {
        const product = await Product.create({
            name,
            image,
            description,
            price,
            ingredients,
            categoryId,
            stockLevel
        });
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error); 
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

//get products
const getProducts=async(req,res)=>{
    const products=await Product.find().sort({createdAt:-1});
    res.status(200).json(products);
    

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
const getProduct = async(req,res)=>{
    const{id}=req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No product found'});
        }    

    const product=await Product.findById(id);

    if(!product){
        return res.status(404).json({error:'No product found'});
    }

    res.status(200).json(product);

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

    res.status(200).json(product);


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
