// Import packages and functions

import inquirer from "inquirer";
import ora from "ora";
import { connectDB, disconnectDB } from "../db/connectDB.js";
import Todos from "../schema/todoSchema.js";
import chalk from "chalk";
import { getTaskCode } from './deleteTask.js'


async function askUpdateQ(todo) {
    try {
        // Prompting the user to update the todo data
        const update = await inquirer.prompt([
            { name: 'name', message: 'Update the name?', type: 'input', default: todo.detail},
            { name: 'detail', message: 'Update the Description?', type: 'input', default:  todo.detail},
            { name: 'status', message: 'Update the Status?', type: 'list', choices: ['pending', 'completed'], default: todo.status},
        ]);

        return update;
    } catch (error) {
        // Error Handling
        console.log('Something went wrong...\n', error)
    }
}

export default async function updateTask(){
    try {
        // Obtaining the task code entered by user by calling getTaskCode() method
        const userCode = await getTaskCode()

        // Connecting to the database
        await connectDB();

        // Starting the spinner
        const spinner = ora('finding the todo...').start();

        // finding the todo which the user wants to update
        const todo = await Todos.findOne({code: userCode.code})

        // Stopping the spinner
        spinner.stop();

        // Checking if the todo exist or not
        if(!todo){
            console.Log(chalk.redBright('Could not find a Todo with the code you provided.'));
        } else {
            console.log(chalk.blueBright('Type the updated properties. Press Enter if you don\'t want to update the data.'));
        }
        // Get the user's response of the updated data by calling askUpdateQ() method
        const update = await askUpdateQ(todo);

        // if user marked status as completed, we delete the todo else we update the data
        if(update.status === 'completed'){
            // Changing spinner text and starting it again
            spinner.text = 'Deleting the todo...';
            spinner.start();

            // deleting the todo
            await Todos.deleteOne({_id : todo._id})
            
            // Stopping the spinner and display the success message
            spinner.stop();
            console.log(chalk.greenBright('Deleted the todo'));
        } else {
            // Update the todo 
            spinner.text = 'Updating the todo';
            spinner.start();
            await Todos.updateOne({_id: todo._id}, update, {runValidators: true})
            spinner.stop()
            console.log(chalk.greenBright('Updated the todo.'));
        } 
        await disconnectDB();
    } catch (error) {
        // Error Handling
        console.log('Something went wrong, Error: ', error)
        process.exit(1);
    }
}

// updateTask();