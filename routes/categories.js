var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var cat= require('../models/category');

// /* GET all cats. */
// router.get('/', function(req, res, next) {
//   console.log("get request");
//   cat.find(function(err,data){
//   	var response={};
// 	if(err) {
// 	    response = {"error" : true,"message" : "Error fetching data"};
// 	} else {
// 	    response = {"error" : false,"message" : data};
// 	}
// 	res.json(response);
//   });
// });

router.route('/:category_id')

/* GET cat with specific id. */
.get(function(req, res, next) {
  console.log("get request");
  cat.findById(req.param.cat_id, function(err,cat){
    var response={};
    if(err) {
        response = {"error" : true,"message" : "Category with specific ID does not exist"};
    } 
    else {
        response = {"error" : false,"message" : cat};
    }
    res.json(response);
  });
})

/* Update specific category_id with new category */
.put(function(req, res, next) {
  console.log("put request");
  cat.findById(req.param.category_id, function(err,cat){
    var response={};
    if(err) {
        response = {"error" : true,"message" : "Error fetching cat"};
    } 
    cat=req.body;
    cat.save(function(err) {
        if(err){
            response = {"error" : true,"message" : "Error saving cat"};
        }
        else {
            response = {"error" : false,"message" : "cat updated!"};
        }
    });
    res.json(response);
  });
})

/* DELETE cat with specific id. */
.delete(function(req, res, next) {
  console.log("delete request");
  cat.findOneAndRemove({_id:req.param.category_id}, function(err,cat){
    var response={};
    if(err) {
        response = {"error" : true,"message" : err};
    } 
    else {
        response = {"error" : false,"message" : "Successfully deleted"};
    }
    res.json(response);
  });
});

/* Post cat into db. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  var cat = new cat({
    title:req.body.title,
    desc:req.body.desc
  });
  cat.save(function(err){
    var response = {};
    if(err) {
      response = {"error" : true,"message" : "Error adding category"};
    } else {
      response = {"error" : false,"message" : "Category added"};
    }
    res.json(response);
  });
});

router.get('/', function(req, res, next) {
  console.log("get request");
  mongoose.model('categories').find(function(err,data){
    var response={};
    if(err) {
        response = {"error" : true,"message" : "Error fetching data"};
    } else {
        response = {"error" : false,"message" : data};
    }
    res.json(response);
  });
});


module.exports = router;
