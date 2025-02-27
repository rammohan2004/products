const express=require('express')
const path=require('path');
const app=express()
const Product=require('./models/product')
const mongoose=require('mongoose')
var methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/farmStand')
.then(()=>{
    console.log("connection open")
})
.catch(err=>{
    console.log("error");
    console.log(err);
})


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')


app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))


const categories=['fruit','vegetable','dairy']

app.get('/products',async(req,res)=>{
    const {category}=req.query;
    if(category){
        const products=await Product.find({category:category});
        res.render("products/index.ejs",{products,category});
    }
    else{
        const products=await Product.find({});
        res.render("products/index.ejs",{products,category:"All"});
    }
    
})


app.get('/products/new',(req,res)=>{
    res.render("products/new",{categories});
})


app.post('/products',async(req,res)=>{
    const product=new Product(req.body);
    await product.save();
    res.redirect(`/products/${product._id}`);
})


app.get('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const product=await Product.findById(id);
    res.render("products/show",{product});
})


app.get('/products/:id/edit',async(req,res)=>{
    const {id}=req.params;
    const product=await Product.findById(id);
    res.render("products/edit",{product,categories});
})


app.put('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const product=await Product.findByIdAndUpdate(id,req.body,{runValidators:true, new:true} );
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const deletedProduct=await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

app.listen(3000,()=>{
    console.log("app is running on port 3000")
})