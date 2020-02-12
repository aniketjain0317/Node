require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5e426b9f69730f0d7e3f64d2').then((task) =>
{
    console.log(task)
    return Task.countDocuments({completed: false})
}).then((count)=>
{
    console.log(count)
})