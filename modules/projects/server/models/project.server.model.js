'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
  projectName: {
    type: String,
    default: '',
    unique: 'Project name already exists',
    required: 'Please fill Project name',
    trim: true
  },
   description:{
    type: String,
    default:'',	 
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Project', ProjectSchema);
