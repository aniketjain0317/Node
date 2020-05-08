const express = require('express')
const User = require('../models/user')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()

 

// CREATE USER
router.post('/users', async (req,res) =>
{
    const user = new User(req.body)
    try
    {
        await user.save()
        const token = await user.genAuthToken()
        res.status(201).send({user,token})
    } catch(e) { res.status(400).send(e) }
})

// LOGIN USER
router.post('/users/login', async (req,res) => 
{
    try
    {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.genAuthToken()
        res.send({user: user,token})

    } catch(e) {res.status(400).send(e)}
})

// LOGOUT USER
router.post('/users/logout',auth,  async (req,res) =>
{
    try
    {        
        req.user.tokens = req.user.tokens.filter(token  => token.token !== req.token)
        await req.user.save()
        res.send()
        
    } catch(e) {res.status(500).send(e)}
})

// LOGOUT ALL SESSIONS
router.post('/users/logoutAll', auth, async (req,res)=>
{
    try
    {
        req.user.tokens = []
        await req.user.save()
        res.send()

    }   catch(e) {res.status(500).send(e)}
})

// READ USER PROFILE
router.get('/users/me',auth, async (req,res) =>
{
    try
    {

        res.send(req.user)
    } catch(e) { res.status(500).send(e) }
})

// UPDATE USER BY ID
router.patch('/users/me', auth, async (req,res) =>
{
    const allowedUpdates = ['name','email','password','age']
 
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    
    if(!isValidOperation) 
    {
        return res.status(400).send( {error: "Invalid Updates"} )
    }
    

    try
    {
        const user = req.user
        updates.forEach(update => user[update]= req.body[update])
        await user.save()
        res.send(user)
    } catch(e) {res.status(500).send(e)}
})

// DELETE USER BY ID
router.delete('/users/me', auth, async (req,res) =>
{
    try
    {
        await req.user.remove()
        res.send(req.user)
    } catch(e) {res.status(500).send(e)}
})


// SETUP MULTER FOR PROFILE PIC
const avatar = multer
({
    limits: 
    {
        fileSize: 1000000,
    },
    fileFilter(req,file,cb)
    {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) 
        {
            return cb(new Error('File must be a jpg, jpeg or a png'),undefined)
        }
        cb(undefined,true)
    }

})

// UPLOAD PROFILE PIC
router.post('/users/me/avatar', auth, avatar.single('avatar'), async (req,res) =>
{
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {res.status(400).send({error:error.message})})

// DELETE PROFILE PIC
router.delete('/users/me/avatar', auth, async (req,res) =>
{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next) => {res.status(400).send({error:error.message})})

// SHOW PROFILE PIC BY ID
router.get('/users/:id/avatar', async (req,res) =>
{
    try
    {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {throw new Error()}
        res.set("Content-Type",'image/png')
        res.send(user.avatar)
    } catch(e) {res.status(404).send()}
})

module.exports = router