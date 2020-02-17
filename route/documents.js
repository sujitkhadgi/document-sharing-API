const express = require('express');
const Documents = require('../models/documents');


const router = express.Router();

router.route('/')
.get(function(req,res, next){
    Documents.find({})
    .then(function(result){
        console.log(result);
        res.status(201);
        res.json(result);   
    })
    .catch(function(err){
        console.log(err);
        res.json(err);
    });
})
.post(function(req,res){
    Documents.create({
        title: req.body.title,
        sem: req.body.sem,
        file: req.body.file
    })
    .then(function(result){
        console.log(result);
        res.status(201);
        res.json({status:201, message:"Document added successfully!"})
    })
    .catch(function(err){
        console.log(err);
        res.json(err); 
    });
});

router.route("/:id")
.delete(function(req, res){
    Documents.deleteOne(
        {id: req.params.id})
        .then(function(result){
            res.status(200);
            res.json({status:200, message: "Document deleted successfully!!"});
        })
        .catch(function(err){
            console.log(err);
            res.json(err);
        })
});

router.route("/:id")
.put(function(req,res){
   Documents.findByIdAndUpdate(
        {_id:req.params.id},
        {$set:req.body})
        .then(function(result){
            if(result === 0){
                console.log(result);
                res.status(500);
                res.json({status: 500, message: 'income update expenses'});
            }else{
                res.status(200);
                res.json({status:200, message: 'income updated!!' });
            }
        })
        .catch(function(err){
            console.log(err);
            res.json(err);            
        })
});

router.route('/:sem')
.get(function(req, res){
    Documents.findOne({_id: req.body.id})
    .then(function(result){
        console.log(result);
        res.status(201);
        res.json(result);
        
    })
    .catch(function(err){
        console.log(err);
        res.send("Notice cannot found")
        
    })
});

module.exports = router;

