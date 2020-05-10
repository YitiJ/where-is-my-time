import mongoose from 'mongoose'
import Task from './Models/Task.js'
import db from './server.js'

exports.handler = async (event,context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        if(event.body == null){
            throw Error("Missing _id");
        }
        const tasks = await Task.findById(event.body);
        const response ={
                msg:"Task found",
                data: tasks
            };
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        };
    } catch (err){
        return {
            statusCode: 500,
            body: JSON.stringify({msg:err.message})
        };
    }
}