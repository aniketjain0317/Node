const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema
({
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
        unique: true,
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
                throw new Error("Please choose a valid password")
            }
        }
    },

    tokens: 
    [{
        token:
        {
            type: String,
            required: true
        }
    }],

    avatar:
    {
        type: Buffer
    }
}, {timestamps: true})


// User - Task Relationship
userSchema.virtual('tasks', 
{
    ref: 'Task',
    foreignField: 'owner',
    localField: '_id'
})





// Public Profile instance method
userSchema.methods.toJSON = function()
{
    const user = this
    const profile = user.toObject()
    delete profile.password
    delete profile.tokens
    return profile
}



// Auth Token instance method
userSchema.methods.genAuthToken = async function ()
{
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


// FindByCredentials model method
userSchema.statics.findByCredentials = async (email,password) =>
{
    const user = await User.findOne({email})
    if(!user) {throw new Error('Unable to login')}
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {throw new Error('Unable to login')}
    return user
}

// Hashing the password before saving
userSchema.pre('save', async function(next)
{
    const user = this
    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

// Deleting tasks when deleting a user
userSchema.pre('remove', async function (next)
{
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})



const User = mongoose.model('User', userSchema)

module.exports = User