const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

//Customize yargs version
yargs.version('1.1.0')

//'Add' Command
yargs.command
({
    command: 'add',
    description: 'Adds a new note',
    builder:
    {
        title: 
        {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:
        {
            describe: 'The body for the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {notes.addNote(argv.title,argv.body)}
})

//'remove' command
yargs.command
({
    command: 'remove',
    description: 'Removes a note',
    builder: 
    {
        title:
        {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {notes.removeNote(argv.title)}
})

//'list' command
yargs.command
({
    command: 'list',
    description: 'lists all the notes',
    handler() {notes.listNotes()}
})

//'read' command
yargs.command
({
    command: 'read',
    description: 'Shows the text inside a note',
    builder:
    {
        title:
        {
            describe: 'title of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {notes.readNote(argv.title)}
})

yargs.parse()