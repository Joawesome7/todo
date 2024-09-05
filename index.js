#!/usr/bin/env node
// Root directory, which will serve as the entry point of our project
// Importing the required functions for each command
import addTask from './commands/addTask.js';
import deleteTask from './commands/deleteTask.js';
import readTask from './commands/readTask.js';
import updateTask from './commands/updateTask.js';

// Importing the command class from Commander.js library
import { Command} from 'commander';

// Creating an instance of the Command class
const program = new Command();

// Setting the name and description of CLI tool
program
.name('todo')
.description('Your terminal task manager!')
.version('1.0.0');

// Defining a command called 'add'
program
.command('add')
.description('Create a new todo.')
.action(addTask);

// Defining a command called 'read'
program
.command('read')
.description('Read all todos task')
.action(readTask);

// Defining a command called 'update'
program
.command('update')
.description('Update all the todos')
.action(updateTask);

// Defining a command called 'delete'
program
.command('delete')
.description('Delete all the todos')
.action(deleteTask);

// Parsing the command-line arguments and executing the corresponding actions
program.parse();