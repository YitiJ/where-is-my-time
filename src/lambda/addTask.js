import mongoose from 'mongoose'
import Task from './models/Task.js'
import db from './server.js'

exports.handler = async (event,context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        const data = JSON.parse(event.body);
        if(data.name == "" || data.name == null) throw Error("Invalid task name:" + data.name);
        const name = data.name, id = mongoose.Types.ObjectId();
        const task = {
                _id: id,
                name: name,
                deleted: false
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