/*
require('dotenv').config()


const express = require('express');
const mongodbConnect = require('./database');
const Product = require('./model/productModel');

mongodbConnect();

const app = express();

app.use(express.json())

app.get('/',(req,res)=> {

res.json({
    message: "hello world"
})

})


app.post('/product',async(req,res) =>{

try{

    const {title,price,description,image} = req.body;
    const product = await Product.create({title,price,description,image});
    console.log("product created successfully.");

}catch(error){
    res.status(500).json({
        message:"Server error",
        error:error.message
    })
}

})



app.listen(process.env.PORT, ( )=>{
    console.log(`server is connected in port,  ${process.env.PORT}`)
})
*/

require('dotenv').config()
const express = require('express');
const mongodbConnect = require('./database');
const Product = require('./model/productModel');


mongodbConnect();
const app = express();
app.use(express.json())


app.get('/', (req, res) => {
    res.json({
        message: "Hello world"
    })
})


app.get('/product', async (req, res) => {

    try {
        const product = await Product.find();
        if (!product) {
            res.json({
                message: "product not found",
                data: product,

            })

        }
        res.json({ message: "product scuccessfully featched.", data: product })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }


})


app.get("/product/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const singleProduct = await Product.findById(id);
        if (!singleProduct) {
            res, json({
                message: "product not found"
            })
        }

             res.json({
                data: singleProduct
            })

    } catch {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }

})




//Delete
app.delete("/product/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const singleProductDel = await Product.findByIdAndDelete(id);
        if (!singleProductDel) {
            res.json({
                message: "product not found"
            })
        }

        res.json({ message: "product scuccessfully deleted.", data: singleProductDel })


    } catch(error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }

})



//Patch
app.patch("/product/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const {title,price,description,image} = req.body

        const product = await Product.findByIdAndUpdate(id,{title,price,description,image});
        
        if (!product) {
            res.json({
                message: "product not found"
            })
        }

        res.json({ message: "product scuccessfully updated."})


    } catch(error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }

})


app.post('/product', async (req, res) => {
    try {
        const { title, price, description, image } = req.body;

        const product = await Product.create({ title, price, description, image });

        res.status(201).json({
            message: "Product created successfully.",
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
})



app.listen(process.env.PORT, () => {
    console.log(`Server is connected on port ${process.env.PORT}`)
})