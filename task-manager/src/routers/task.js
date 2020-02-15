const express = require('express')
const User = require('../models/user')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')

// CREATE TASK
router.post('/tasks', auth, async (req,res) =>
{
    try
    {
        const task = new Task({...req.body, owner: req.user._id})
        await task.save()
        res.status(201).send(task)
    } catch(e) {res.status(400).send("WHAT NOW")}
})

// READ ALL TASKS
// GET /tasks? completed=false & limit=10 & skip=20)
// GET /tasks? 
router.get('/tasks', auth, async (req,res) =>
{
    const match = {}
    const sort = {}
    if(req.query.completed) {match.completed = (req.query.completed === "true")}
    if(req.query.sortBy)
    {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = (parts[1]==='desc')?-1:1
    }

    try
    {
        await req.user.populate
        ({
            path: 'tasks',
            match,
            options:
            {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e) {res.status(500).send(e)}
})

// READ TASK BY ID
router.get('/tasks/:id', auth, async (req, res) =>
{
    try
    {
        const _id = req.params.id
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task) {return res.status(404).send()}
        res.send(task)   
    } catch(e) {res.status(500).send(e)}
})

// UPDATE TASK BY ID
router.patch('/tasks/:id', auth, async (req,res) =>
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
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        if(!task) {return res.status(404).send()}
        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch(e) {res.status(500).send(e)}
})

// DELETE TASK BY ID
router.delete('/tasks/:id', auth, async (req,res) =>
{
    const _id = req.params.id
    try
    {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id})
        if(!task) {res.status(404).send()}
        res.send(task)
    } catch(e) {res.status(500).send(e)}
})

module.exports = router