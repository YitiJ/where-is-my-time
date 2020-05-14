import mongoose from 'mongoose'
import Task from './Models/Task.js'
import db from './server.js'

exports.handler = async (event,context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        const data = JSON.parse(event.body);
        if(data.name == "" || data.name == null) throw Error("Invalid task name:" + data.name);
        await Task.findByIdAndUpdate(data._id,data);
        const response ={
                msg:"Task edited sucessfully"
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