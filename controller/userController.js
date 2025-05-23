
const userModel = require('../model/usermodel');
const webtocken = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const token = require('token');
const { randomBytes } = require('crypto');
const { send } = require('process');


exports.CreateUSer = async (req, res) =>{

    const {fullName, email, password} = req.body
    try {

        // check if user email already exist
        const ExistingUser = await userModel.findOne({where:{email}})

        const hashpass = await bcrypt.hash(password, 10);

        const token = crypto.randomBytes(32).toString('hex');

        

        const user = await userModel.create(
            {
                fullName,
                email, 
                password:hashpass,
                isVerified: false,
                token
            })

            const message = `${process.env.BASE_URL}/verify/${user.id}/${user.token}`

            SendEmail(user.email, 'verify your account', message)

            res.json({message:"user created successfully",user})

    } catch (error) {
        
        console.log('error occured during creation of account', error);
        
    }
}