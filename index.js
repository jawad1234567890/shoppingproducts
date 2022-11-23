const Joi= require('joi');
const cors= require('cors');
const express = require ('express');
const { get } = require('mongoose');
// import express from 'express';
const app= express();
app.use(cors());

app.use(express.json());

const products=require("./api.json");
app.get ('/',(req,res)=>{
res.send('hello');
});

app.get('/products',(req,res)=>{
 res.send(products);
});
app.post('/products',(req,res)=>{
const schema={name:Joi.string().min(3).required(),};
const result =Joi.validate(req.body,schema);
console.log(result);



 if(result.error)   
 { res.status(400).send(result.error.details[0].message)
 return;}
 
 const product={
  id:products.length,
  name:req.body.name,
  image:req.body.image,
  averageratings:req.body.averageratings,
  price:req.body.price,
 };
 products.push(product);
 res.send(product);
 });
app.get('/products/:id',(req,res)=>{
const product=products.find(c=>c.id=== parseInt(req.params.id));
if(!product)
    res.status(404).send('Products Contains given id is not found...')
res.send(product);

});

const port=process.env.PORT ||5000;
app.listen(port, ()=>console.log(`Listening on Port ${port}....`))