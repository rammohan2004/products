const mongoose=require('mongoose');
const Product=require('./product.js');
mongoose.connect('mongodb://localhost:27017/farmStand2')
.then(()=>{
    console.log("connection open")
})
.catch(err=>{
    console.log("error");
    console.log(err);
})

const farmSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }]

})

const Farm=mongoose.model('Farm',farmSchema);

const newFarm=new Farm({name:"Ravi Farms",location:"Addanki Prakasam"});
const newProduct=new Product({name:"Apple",price:10,category:"fruit"});

newFarm.product.push(newFarm);
const func=async()=>{
    const np=await newProduct.save();
    const nf=await newFarm.save();
    console.log(np);
    console.log(nf);
    
}
func();
