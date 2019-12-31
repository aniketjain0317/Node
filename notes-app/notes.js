const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () 
{
    return 'Your notes...'
}

const addNote = function(title,body)
{
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title===title)
    if (!duplicateNote)
    {
        notes.push
        ({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New Note added'))
    }
    else { console.log(chalk.red('Note Title Taken!'))   }
}

const removeNote = function(title)
{
    const notes = loadNotes()
    const newNotes = notes.filter(note => !(note.title===title))
    if (newNotes.length<notes.length)
    {
        saveNotes(newNotes)
        console.log(chalk.green('Note Removed!'))
    }
    else { console.log(chalk.red('No Note Found!')) }
}

const listNotes = function()
{
    const notes = loadNotes()
    if (!notes.length) {console.log(chalk.red('No Notes Found!'))}
    else
    {
        console.log(chalk.bgGreen('List of Notes: '))
        notes.forEach(note => console.log(note.title));
    }
}

const readNote = function(title)
{
    const notes = loadNotes()
    const toBeRead = notes.find(note => note.title===title)
    if (toBeRead)
    {
        console.log(chalk.green.bold.underline(toBeRead.title))
        console.log(toBeRead.body)
    }
    else {console.log(chalk.red('No Note Found!'))}
}


const loadNotes = function()
{
    try
    {
        const dataBuffer = fs.readFileSync('notes.JSON')
        const dataJSON = dataBuffer.toString()
        const data = JSON.parse(dataJSON)
        return data
    }
    catch(err) {return []}
}

const saveNotes = function(notes)
{
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',notesJSON)
}

module.exports =
{
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}