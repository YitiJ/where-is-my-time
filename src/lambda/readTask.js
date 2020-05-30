import mongoose from 'mongoose'
import Task from './models/Task.js'
import db from './server.js'

exports.handler = async (event,context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        const tasks = await Task.find({deleted: false});
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