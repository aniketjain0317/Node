const express = require('express')
const User = require('../models/user')
const Task = require('../models/task')
const router = new express.Router()

// CREATE TASK
router.post('/tasks', async (req,res) =>
{
    try
    {
        const tast = new Task(req.body)
        await task.save()
        res.status(201).send(task)
    } catch(e) {res.status(400).send(e)}
})

// READ ALL TASKS
router.get('/tasks', async (req,res) =>
{
    try
    {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {res.status(500).send(e)}
})

// READ TASK BY ID
router.get('/tasks/:id', async (req, res) =>
{
    try
    {
        const _id = req.params.id
        const task = await Task.findById(_id)
        if(!task) {return res.status(404).send()}
        res.send(task)   
    } catch(e) {res.status(500).send(e)}
})

// UPDATE TASK BY ID
router.patch('/tasks/:id', async (req,res) =>
{
    const allowedUpdates = ['description','completed']
 
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    
    if(!isValidOperation) 
    {
        return res.status(400).send( {error: "Invalid Updates"} )
    }
    
    try
    {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators:true})
        if(!task) {return res.status(404).send()}
        res.send(task)
    } catch(e) {res.status(400).send()}
})

// DELETE TASK BY ID
router.delete('/tasks/:id', async (req,res) =>
{
    const _id = req.params.id
    try
    {
        const task = await Task.findByIdAndDelete(_id)
        if(!task) {res.status(404).send()}
        res.send(task)
    } catch(e) {res.status(500).send(e)}
})

module.exports = router