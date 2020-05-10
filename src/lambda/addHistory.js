import mongoose from 'mongoose'
import TaskHistory from './Models/TaskHistory.js'
import db from './server.js'

exports.handler = async (event,context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        const data = JSON.parse(event.body);
        const id = mongoose.Types.ObjectId();
        const history = {
                _id: id,
                startTime: data.startTime,
                duration: data.duration,
                taskID: data.taskID

            };
        const response ={
                msg:"History added sucessfully",
                data: history
            };
        await TaskHistory.create(history);
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