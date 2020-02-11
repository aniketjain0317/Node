const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', 
{
    name: 
    {
        type: String,
        required: true,
        trim: true
    },

    age:
    {
        type: Number,
        default: 0,
        validate(value)
        {
            if(value<0)
            {
                throw new Error("Negative age.")
            }
        }
    },

    email:
    {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid Email")
            }
        }
    },

    password:
    {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value)
        {
            if(value.toLowerCase().includes("password"))
            {
                throw new Error("Please choose a less chutiya password")
            }
        }
    }
})


module.exports = User