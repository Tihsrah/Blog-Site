const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require("mongoose");
var _ = require('lodash');


const app = express();


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.listen('4000', function() {});

// variables
// var dict = {};
var tit = "";
var story = "";
// posts = []

//mongo
//mongodb://localhost:27017/blog
//
mongoose.connect("mongodb+srv://Tihsrah:harshlf4@cluster0.mzqbbfb.mongodb.net/blogDB",{useNewUrlParser:true});

const blogsSchema={
  blogTitle:String,
  blogBody:String
}
const Blog=mongoose.model("Blog",blogsSchema);



const s="";
app.get('/', function(req, res) {

  Blog.find({},function(err,foundBlog){
      // console.log("Success");
      if(err){

      }
      res.render("index", {s:s,foundItem:foundBlog});
      
  })


  // res.render("index", {
  //   dict: dict
  // });
})


app.get('/about', function(req, res) {
  res.render('about');
})
app.get('/contact', function(req, res) {
  res.render('contact');
})

app.get('/compose', function(req, res) {
  res.render('compose', {
    title: tit,
    message: story
  });
})

app.post('/compose', function(req, res) {
  tit = req.body.title;
  story = req.body.textarea;

  // dict[`${tit}`] = story;
  const blog=new Blog({
    blogTitle:tit,
    blogBody:story
  })
  blog.save();

  // console.log(dict);
  // posts.push(tit);
  // console.log(posts);
  res.redirect('/');
})

app.get('/same-bro-same', function(req, res) {
  res.render('extra');
})

//yahan par kam kar rhe the
app.get('/posts/:postName', function(req, res) {
  var userAsked = mongoose.Types.ObjectId(req.params.postName);
  userAsked=String(userAsked)
  // var temp = _.lowerCase(userAsked);
  // var flag = 0;
  // console.log(userAsked);
    Blog.findById(userAsked,function(err,foundList){
      // console.log(foundList.blogTitle)
      if(err){
        // console.log("lol");
      }else{
      res.render('extra', {post: foundList.blogTitle,dict: foundList.blogBody,del:userAsked});
      }
    })
  })

app.post('/delete',function(req,res){
  const toBeDeleted=req.body.delete;
  Blog.findByIdAndRemove({_id:toBeDeleted},function(err){

  });
  res.redirect('/');
})

  // for (const k in dict) {
  //   var storedTitle = _.lowerCase(k)
  //   if (storedTitle === temp) {
  //     flag = 1;
  //     break;
  //   }
  // }
  // if (flag === 1) {
  //   // console.log(posts);
  //   res.render('extra', {
  //     post: userAsked,
  //     dict: dict
  //   })
  // } else {
  //   res.render('notFound');
  // }
// })
