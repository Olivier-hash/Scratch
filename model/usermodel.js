
const {DataTypes} = reuire('sequelize')


const dbconn = require('../config/db')


const Users = dbconn.define('users', {
    
    fullName:{
        type:DataTypes.STRING,
        allowNull: false,
        validate: {
            len:[5]
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
            isEmail:true
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len:[8]
        }
    },
    isVerified:{
        type:DataTypes.BOOLEAN,

    },
    token:{
        type:DataTypes.STRING
    }
})

module.exports = Users