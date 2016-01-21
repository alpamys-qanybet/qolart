var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var Item = require('../models/items');

// /* GET all items. */
// router.get('/', function(req, res, next) {
//   console.log("get request");
//   Item.find(function(err,data){
//   	var response={};
// 	if(err) {
// 	    response = {"error" : true,"message" : "Error fetching data"};
// 	} else {
// 	    response = {"error" : false,"message" : data};
// 	}
// 	res.json(response);
//   });
// });

router.route('/:item_id')

/* GET item with specific id. */
.get(function(req, res, next) {
  console.log("get request");
  Item.findById(req.param.item_id, function(err,item){
    var response={};
    if(err) {
        response = {"error" : true,"message" : "Item with specific ID does not exist"};
    } 
    else {
        response = {"error" : false,"message" : item};
    }
    res.json(response);
  });
})

/* Update specific item_id with new item */
.put(function(req, res, next) {
  console.log("put request");
  Item.findById(req.param.item_id, function(err,item){
    var response={};
    if(err) {
        response = {"error" : true,"message" : "Error fetching item"};
    } 
    item=req.body;
    bear.save(function(err) {
        if(err){
            response = {"error" : true,"message" : "Error saving item"};
        }
        else {
            response = {"error" : false,"message" : "Item updated!"};
        }
    });
    res.json(response);
  });
})

/* DELETE item with specific id. */
.delete(function(req, res, next) {
  console.log("delete request");
  Item.findOneAndRemove({_id:req.param.item_id}, function(err,item){
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

/* Post item into db. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  var item = new Item({
    title:req.body.title,
    desc:req.body.desc
  });
  item.save(function(err){
    var response = {};
    if(err) {
      response = {"error" : true,"message" : "Error adding item"};
    } else {
      response = {"error" : false,"message" : "item added"};
    }
    res.json(response);
  });
});

router.get('/', function(req, res, next) {
  console.log("get request");
  mongoose.model('items').find(function(err,data){
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
