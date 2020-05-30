import mongoose from 'mongoose'
import Task from './models/Task.js'
import TaskHistory from './models/TaskHistory.js'
import db from './server.js'

exports.handler = async (event,context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        const data = JSON.parse(event.body);
        var his = await TaskHistory.find({task:data._id});
        if(his != null && his.length != 0){
            data.deleted = true;
            await Task.findByIdAndUpdate(data._id,data);
        }
        else{
            await Task.findByIdAndDelete(data._id);
        }
        const response ={
                msg:"Task deleted sucessfully"
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