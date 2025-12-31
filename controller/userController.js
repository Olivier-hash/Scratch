
const userModel = require('../model/usermodel');
const webtocken = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const token = require('token');
const { randomBytes } = require('crypto');
const { send } = require('process');


exports.CreateUSer = async (req, res) =>{

    const {fullName, email, password} = req.body
    try {

        // check if user email already exist sd
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




exports.Login = async(req,res) =>{

    const{email, password} = req.body

    try {
        const user = await userModel.findOne({where: {email}})
        if (!user) {
            res.json('user not found')
        }

        if(!user.isVerified){
            
            return res.json({message: 'please verify your email before logging in.'});
        }
        else{

            const hashpass = await bcrypt.compare(password, user.password )

            if(!hashpass){
                res.json('invalid password')
            }
            else{
                const secreteKey = process.env.secreteKey

                const token = JsonWebTokenError.sign({fullName: user.fullName, email:user.email, isVerified:isVerified}, secreteKey,{expires: '3h'})
                res.json({message:'login successful',
                    user:{fullName: user.fullName, email:user.email, isVerified:isVerified}
                })
            }
        }
    } catch (error) {
        
    }
}



// Tommorow s  

exports.VerifyEmail = async (req,res)=>{

    const {id , token} =  req.params;

    try {
       
        const user = await UserModel.findByPk(id) ;
        if(!user){
            res.json('user not found')
        }

        if(user.token !== token){
            res.json('token does not exist')
        }

        user.isVerified = true ,
        user.token = null

        await user.save()

        res.json('token verified successfully')
        
        


    } catch (error) {
        
        console.log('error occured', error)
    }

}


exports.forgotPassword =async (req,res)=>{

    const{Email} = req.body

    try {

        const user = await UserModel.findOne({where:{Email}});
        if(!user){
            res.json('user not found');
        }

        const token = crypto.randomBytes(32).toString('hex');

         user.token = token ;
         await user.save();

         const message = `${process.env.BASE_URL}/reset/${user.id}/${token}`

         SendEmail(user.Email , 'reset your password' , message)

        res.json({message:'email send to your account to reset password',  token  })
        
    } catch (error) {
        console.log('error occured', error)
        
    }
    
}




exports.ResetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { newPass } = req.body;

    try {
        // Check if newPass is provided
        if (!newPass) {
            return res.status(400).json({ message: 'New password is required' });
        }

        const user = await UserModel.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.token !== token) {
            return res.status(400).json({ message: 'Invalid token' });
        }

        const hashpass = await bcrypt.hash(newPass, 10);
        user.password = hashpass;
        user.token = null;

        await user.save();

        res.json({ message: 'Password reset successfully' });

    } catch (error) {
        console.log('error occurred:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

