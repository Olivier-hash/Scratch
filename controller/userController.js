
const userModel = require('../model/usermodel')

exports.CreateUSer = async (req, res) =>{

    const {fullName, email, password} = req.body
    try {
        const user = await userModel.create({fullName, email, password})
        res.json({message:"user created successfully",user})
    } catch (error) {
        console.log('error occured during creation of account', error);
        
    }
}