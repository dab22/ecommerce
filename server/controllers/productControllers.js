const ROLES = require("../utils/constants");
const Product = require("../models/Product");
const cloudinary = require("../utils/cloudinary");

const createProduct = async(req, res)=>{
    
    if(req.role !== ROLES.admin){
        return res.status(401).json({success: false, message: " Access Denied"});
    }

    try{
        const {name, price, description, stock, colors, category} = req.body;
        const uploadedImages = [];

        
        for(const file in req.files){
            const result = await cloudinary.uploader.upload(req.files[file].path,{
                folder: "products",
            });

            uploadedImages.push({
                url: result.secure_url,
                id: result.public_id,
            });
        }

        const product = new Product({
            name, price, description, stock, colors, category, images: uploadedImages,
        });
        await product.save();
        return res.status(200).json({success: true, data: product, message: "Product added successfully"});
    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};


const updateProduct = async(req, res)=>{
    if(req.role !== ROLES.admin){
        return res.status(401).json({success: false, message: "Access denied"});
    }

    try{
        const {...data} = req.body;
        const {id} = req.params;

        const product = await Product.findByIdAndUpdate(id, data, {new: true});
        if(!product){
            return res.status(404).json({success: false, message: "Product not found"});
        }
        return res.status(200).json({success: true, data: product, message:"Product updated successfully"});

    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};



const deleteProduct = async(req, res)=>{
    if(req.role !== ROLES.admin){
        return res.status(401).json({success: false, message: "access denied"});
    }

    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({success: false, message: " Product not found"});
        }
        return res.status(200).json({success: true, data: product, message: " Product deleted successfully"});

    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};



const getProducts = async(req, res)=>{
    // if(req.role !== ROLES.admin){
    //     return res.status(401).json({success: false, message: "Access denied"});
    // }

    try{
        let{page, limit, category, price, search} = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 9;

        let query = {};
        if (category && category !== "all") {
  query.category = { $regex: category, $options: "i" };
}

        if(category == "all"){
            delete query.category;
        }
        
        if (search) {
    query.$or = [
        { name: { $regex: search, $options: "i" } }, 
        { description: { $regex: search, $options: "i" } },
        // { category: { $regex: search, $options: "i" } },
    ];
    
}

        if (price) {
  const priceValue = parseFloat(price);
  if (!isNaN(priceValue) && priceValue > 0) {
    query.price = { $lte: priceValue };
  }
}


        const totalProducts = await Product.countDocuments(query);
        const totalPages = Math.ceil(totalProducts / limit);

        const products = await Product.find(query)
        .select("name price images rating description blacklisted")
        .skip((page - 1) * limit)
        .limit(limit);

        let newProductsArray = [];
        products.forEach((product)=>{
            const productObj = product.toObject();
            productObj.image = productObj.images[0];
            delete productObj.images;
            newProductsArray.push(productObj);
        });

        if(!products.length){
            return res.status(404).json({success: false, message:"Product not found"});
        }

        return res.status(200).json({
            success: true,
            data:newProductsArray,
            pagination:{
                totalProducts, totalPages, currentPage: page, pageSize: limit,
            }, 
            message: "Product fetched"
        });

    }catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};

// const getProductByName = async(req, res)=>{
//     const {name} = req.params;

//     try{
//         const product = await Product.findOne({name: {
//             $regex: new RegExp(name, "i"),
//         }});
//         if(!product){
//             return res.status(404).json({success: false, message: "Product not foound"});
//         }

//         return res.status(200).json({success: true, data: product, message: "Product found"});

//     }catch(error){
//         return res.status(500).json({success: false, message: error.message});
//     }
// };


const getProductByName = async (req, res) => {
    let { name } = req.params;

    try {
        // Convert dashes to spaces so it matches DB
        name = name.replace(/-/g, " ");

        const product = await Product.findOne({
            name: { $regex: new RegExp(name, "i") }, // case-insensitive match
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: product,
            message: "Product found",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};














// const blackListProduct = async(req, res) => {
//     if(req.role !== ROLES.admin){
//         return res.status(401).json({success: false,  message: "Access denied"});
//     }

//     try{
        
//         const product = await Product.findByIdAndUpdate(
//             id,
//             {blacklisted: true},
//             {new: true}
//         );
//         if(!product){
//             return res.status(404).json({success:false, message: "Product not found"});
//         }

//         return res.status(200).json({success: true, message: `the prioduct ${productName} has been blacklisted`});
//     }catch(error){
//         console.log(error);
//         return res.status(401).json({success: false, message: error.message});
//     }
// };



const blackListProduct = async (req, res) => {
    try {
        const { id } = req.params;  

        console.log("Product ID received:", id); // Debugging log

        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is missing" });
        }

        const product = await Product.findByIdAndUpdate(
            id,
            { blacklisted: true },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({
            success: true,
            message: `The product ${product.name} has been blacklisted`
        });

    } catch (error) {
        console.error("Error in blackListProduct:", error);  // Debugging
        return res.status(500).json({ success: false, message: error.message });
    }
};

const removeFromBlacklist = async (req, res) => {
    try {
        const { id } = req.params;  // ✅ Extract ID from request parameters

        console.log("Product ID received for removal:", id); // Debugging

        if (!id) {
            return res.status(400).json({ success: false, message: "Product ID is missing" });
        }

        const product = await Product.findByIdAndUpdate(
            id,
            { blacklisted: false },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        return res.status(200).json({ 
            success: true, 
            message: `The product ${product.name} has been removed from blacklist` 
        });

    } catch (error) {
        console.error("Error in removeFromBlacklist:", error); // Debugging
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {createProduct, updateProduct, deleteProduct, getProducts, getProductByName, blackListProduct, removeFromBlacklist};