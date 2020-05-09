import mongoose from 'mongoose'
import Task from './model.js'
import db from './server.js'

exports.handler = async (event,context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        const data = JSON.parse(event.body);
        const name = data.name, id = mongoose.Types.ObjectId();
        const task = {
                _id: id,
                name: name
            };
        const response ={
                msg:"Task added sucessfully",
                data: task
            };
        await Task.create(task);
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