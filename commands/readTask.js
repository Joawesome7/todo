// Importing packages and functions
import { connectDB, disconnectDB } from "../db/connectDB.js";
import Todos from "../schema/todoSchema.js";
import chalk from "chalk";
import ora from "ora";

    export default async function readTask() {
        try {
            // Connecting to the database
            await connectDB();

            // Starting the spinner
            const spinner = ora('Fetching all todos...').start();

            // fetching all the todos from the database
            const todos = await Todos.find({});

            // stopping the spinner
            spinner.stop();

            // check if todos exist or not
            if(todos.length === 0){
                console.log(chalk.blueBright('You do not have any tasks yet!'))
            } else {
                todos.forEach(todo => {
                    console.log(
                        chalk.cyanBright('Todo Code: ') + todo.code + '\n' + 
                        chalk.blueBright('Name: ') + todo.name + '\n' + 
                        chalk.yellowBright('Description: ') + todo.detail + '\n'
                    )
                })
            } 
            await disconnectDB()
        } 

    catch (error) {
        // Error handling
        console.log('Something went wrong, Error: ', error);
        process.exit(1);
    }
}

// readTask();