
const {CreateUSer} = require('../controller/userController')

const express = require('express')


const Router = express.Router();

Router.post('/',CreateUSer)


module.exports = Router