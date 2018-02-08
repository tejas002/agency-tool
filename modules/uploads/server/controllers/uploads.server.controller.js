'use strict';
/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Upload = mongoose.model('Upload'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  fs = require('fs'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  http = require('http'),
  request = require('request'),
  GridStore = require('mongodb').GridStore;
var db = mongoose.connection.db;



var server = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.hostname + ':' + config.port;
/**
 * Create a Upload
 */
/**
 * Create a Upload
 */
exports.create = function(req, res) {
  var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, config.uploads.profile.uploads.dest)
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  var upload = multer({
    storage: storage
  }).array('files', 1);
  upload(req, res, function(uploadError) {
    if (uploadError) {
      //console.log('upload error', uploadError);
      return res.status(400).send({
        message: 'Error occurred while uploading files. ' + uploadError
      });
    } else {
      try {

        var requestObj = JSON.parse(req.body.upload);
        var upload = new Upload(requestObj);
        

        if (req.files[0]) {
          upload.uploadUrl ='/'+ req.files[0].path.replace(/\\/g, '/');
        }
        //console.log(req.body.upload)
        upload.user = req.user;
        upload.project = req.user.lastLoggedOnProject;
        if(upload.progressPercentage=='100')
        {upload.jobstatus='Completed'}
        else{
          upload.jobstatus='Pending'
        }

        upload.save(function(err) {
          console.log(typeof(upload.user._id))
          User.findById(upload.user._id, function(erro, doc) {
            doc.status=upload.jobstatus
            //console.log(doc);
            doc.save(function(error){
              if (error) {
                return res.status(400).send({
                  message: errorHandler.getErrorMessage(err)
                });
              } else {
                res.jsonp(upload);
              }
            })
            
          });
          
        });
      } catch (e) {
        console.log(e);
        return res.status(400).send({
          message: 'Error occurred while uploading files'
        });
      }
    }
  });
};


/**
 * Show the current Upload
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var upload = req.upload ? req.upload.toJSON() : {};
  
  upload.isCurrentUserOwner = req.user && upload.user && upload.user._id.toString() === req.user._id.toString() ? true : false;
  res.jsonp(upload);
};
/**
 * Update a Upload
 */
exports.update = function(req, res) {
  var upload = req.upload;
  upload = _.extend(upload, req.body);
  upload.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(upload);
    }
  });
};
/**
 * Delete an Upload
 */
exports.delete = function(req, res) {
  var upload = req.upload;
  //console.log("Upload URL",upload.uploadUrl)
  //fs.unlinkSync(upload.uploadUrl);
  upload.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(upload);
    }
  });
};
/**
 * List of Uploads
 */
exports.list = function(req, res) {
  Upload.find({
    project: req.user.lastLoggedOnProject
  }).sort('-created').populate('user', 'displayName').exec(function(err, uploads) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(uploads);
    }
  });
};
/**
 * Upload middleware
 */
exports.uploadByID = function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Upload is invalid'
    });
  }
  Upload.findById(id).populate('user', 'displayName').exec(function(err, upload) {
    if (err) {
      return next(err);
    } else if (!upload) {
      return res.status(404).send({
        message: 'No Upload with that identifier has been found'
      });
    }
    req.upload = upload;
    next();
  });
};