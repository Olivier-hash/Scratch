
const {Sequelize} = require('sequelize')

const dbconn = new Sequelize("Scratch","root","", {
       host: 'localhost',
       dialect: 'mysql'
}) 

const checkdb = async() =>{
    try {
        await dbconn.authenticate();
        console.log("db connected successfully");
    } catch (error) {
        console.log('error occured', error);     
    }
}
checkdb();

exports.module = dbconn;