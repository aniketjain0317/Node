const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true} , (error, client) =>
{
    if (error) {return console.log(error)}
    const db = client.db(dbName)
    
    
    // db.collection('tasks').insertMany
    // (
    //     [
    //         {
    //             name:"Task 1",
    //             description: "idk what task 1 is",
    //             completed: false
    //         },
    //         {
    //             name:"Task 2",
    //             description: "i hae done the ting!",
    //             completed: true
    //         },
    //         {
    //             name:"Task 69",
    //             description: "*insert lenny face here*",
    //             completed: false
    //         }
    //     ],
    //     (error,result) => 
    //     {
    //         if(error) {return console.log('err')}
    //         console.log(result.ops)
    //     }
    // )


//     db.collection('tasks').findOne
//     ( 
//         {_id: new ObjectID("5e412ada67370f05f5632c03")} ,
//         (error, task) =>
//         {
//             console.log(task)
//         } 
//     )
//     db.collection('tasks').find({completed: false}).toArray((error,tasks) =>
//     {
//         console.log(tasks)
//     })

    // db.collection('tasks').updateMany
    // (
    //     {
    //         completed: false
    //     },            
    //     {
    //         $set: 
    //         {
    //             completed: true
    //         }
    //     }
    // ).then((result) =>
    // {
    //     console.log(result.modifiedCount)
    // }).catch((error) => 
    // {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne
    ({
        name: "Task 69"
    }).then((result) =>
    {
        console.log(result.deletedCount)
    }).catch((error) => 
    {
        console.log(error)
    })
})