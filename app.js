const express= require('express');
const bodyParser=require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

app.listen('3000',function(){});

app.get('/test',function(req,res){
  res.render("index");
})
app.post('/',function(req,res){
  res.send("working");
})
