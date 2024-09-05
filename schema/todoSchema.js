// This file stores the Mongoose Schema and Model. Basically, a blue print for our tasks, that is how our tasks will look.

import mongoose from "mongoose";
import { nanoid } from "nanoid";

const TodoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    detail: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ['done', 'progress'],
        default: 'pending',
        trim: true
    }, 
    code: {
        type: String,
        required: true,
        default: 'code',
        trim: true
    } 
}, {timestamps: true});

TodoSchema.pre('save', function(next){
    this.code = nanoid(10);
    next();
});

const Todos = mongoose.model('Todos', TodoSchema)
export default Todos;