import inquirer from "inquirer";
import { connectDB, disconnectDB } from "../db/connectDB.js";
import Todos from "../schema/todoSchema.js";
import ora from "ora";
import chalk from "chalk";

async function input(){
    const answer = await inquirer.prompt([
        { name: 'name', message: 'Enter name of the task:', type: 'input' },
        { name: 'detail', message: 'Enter the details of the task: ', type: 'input' },
    ])
    return answer;
}

// const output = await input()
// console.log(output);

const askQuestion = async() => {
    const todoArray = []
    let loop = false;

    do{
        const userRes = await input();
        todoArray.push(userRes);
        const confirmQ = await inquirer.prompt([{ name: 'confirm', message: 'Do you want to add more task?', type: 'confirm'}]);
        if(confirmQ.confirm){
            loop = true;
        } else {
            loop = false;
        }
    } while(loop)
        return todoArray;
}

// const output = await askQuestion();
// console.log(output);

export default async function addTask() {
    try {
        // Calling askQuestions to get array of todo's
        const userResponse = await askQuestion();

        // Connecting to the database
        await connectDB();

        // Displaying a spinner with the following text message using ora
        let spinner = ora('creating the todos..').start();

        // looping over every todo in the userResponse array
        // and saving each todo in the database
        for(let i = 0; i<userResponse.length; i++){
            const response = userResponse[i];
            await Todos.create(response);
        }

        // Stopping the spinner and displaying the success message
        spinner.stop();
        console.log(chalk.greenBright('Created the todos!'))

        // Disconnecting the database
        await disconnectDB();
    } catch (error) {
        // Error Handling
        console.log('Something went wrong, Error:', error);
        process.exit(1);
    }
}

// addTask();