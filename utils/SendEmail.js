
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config()

const SendEmail = async( email, subject , text)=>{

    try {

        const Transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS

            }
        }) 
        await Transporter.sendMail({
            from: process.env.EMAIL_USER,
            to:email,
            subject:subject,
            text:text
        })
        
    } catch (error) {
        console.log('error occured', error)
    }

}

module.exports = SendEmail