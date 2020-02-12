const express = require('express')
const User = require('../models/user')
const Task = require('../models/task')
const router = new express.Router()

// CREATE USER
router.post('/users', async (req,res) =>
{
    const user = new User(req.body)
    try
    {
        await user.save()
        res.status(201).send(user)
    } catch(e) { res.status(400).send(e) }
})

// READ ALL USERS
router.get('/users', async (req,res) =>
{
    try
    {
        const users = await User.find({})
        res.send(users)
    } catch(e) { res.status(500).send(e) }
})

// READ USER BY ID
router.get('/users/:id', async (req,res) =>
{
    try
    {
        const _id = req.params.id
        const user = await User.findById(_id)
        if(!user) {return res.status(404).send()}
        res.send(user)
    } catch(e) {res.status(500).send()}
})

// UPDATE USER BY ID
router.patch('/users/:id', async (req,res) =>
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
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        if(!user) {return res.status(404).send()}
        res.send(user)
    } catch(e) {res.status(400).send()}
})

// DELETE USER BY ID
router.delete('/users/:id', async (req,res) =>
{
    const _id = req.params.id
    try
    {
        const user = await User.findByIdAndDelete(_id)
        if(!user) {res.status(404).send()}
        res.send(user)
    } catch(e) {res.status(500).send(e)}
})

module.exports = router