const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true, useUnifiedTopology: true} , (error, client) =>
{
    if (error) {return console.log(error)}
    const db = client.db(dbName)

    db.collection('tasks').findOne
    ( 
        {_id: new ObjectID("5e1762d31fd868095096e81d")} ,
        (error, task) =>
        {
            console.log(task)
        } 
    )
    db.collection('tasks').find({completed: false}).toArray((error,users) =>
    {
        console.log(users)
    })
})