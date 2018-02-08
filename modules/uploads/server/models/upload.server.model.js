'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
/**
 * Upload Schema
 */
var UploadSchema = new Schema({
    name: {
        type: String,
        default: '',
        //required: 'Please fill dataset name',
        unique: 'Dataset name already exists',
        trim: true
    },
    description: {
        type: String,
        //required: 'Please describe on the dataset',
        default: ''
    },
    uploadUrl: {
        type: String,
        //required: 'Please upload the csv file',
        default: ''
    },
    
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    project: {
        type: Schema.ObjectId,
        ref: 'Project'
    }
    ,
    jobstatus: {
        type: String,
        default: '',
        trim: true
    },
    progressPercentage:{
        type: String,
        default: '',
    }
    
});
mongoose.model('Upload', UploadSchema);
