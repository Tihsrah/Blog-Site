const express= require('express');
const bodyParser=require('body-parser');
var _ = require('lodash');


const app=express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');
app.listen('4000',function(){});

// variables
var dict = {
};
var tit="";
var story="";
posts=[]


app.get('/',function(req,res){
  res.render("index",{dict:dict});
})


app.get('/about',function(req,res){
  res.render('about');
})
app.get('/contact',function(req,res){
  res.render('contact');
})

app.get('/compose',function(req,res){
  res.render('compose',{title:tit,message:story});
})
app.post('/compose',function(req,res){
   tit=req.body.title;
   story=req.body.textarea;
  dict[`${tit}`]=story;
  // console.log(dict);
  posts.push(tit);
  // console.log(posts);
  res.redirect('/');
})

app.get('/same-bro-same',function(req,res){
  res.render('extra');
})

//yahan par kam kar rhe the
app.get('/posts/:postName',function(req,res){
  var userAsked=req.params.postName;
  userAsked=_.lowerCase(userAsked);
  var flag=0;
  for (const k in dict){
    var storedTitle=_.lowerCase(k)
    if(storedTitle===userAsked){
      flag=1;
      break;
    }
  }
  if(flag===1){
    // console.log(posts);
  res.render('extra',{post:userAsked,dict:dict})
}else{
  res.render('notFound');
}
})
