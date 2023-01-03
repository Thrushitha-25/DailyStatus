
const express = require('express');
const router = express.Router();
const db=require('../../database/connection')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

//register routes
router.post('/api/registration', (req, res) => {});
router.post('/api/login', (req, res) => {});

module.exports=router;