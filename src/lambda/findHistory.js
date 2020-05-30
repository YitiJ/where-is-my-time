import mongoose from 'mongoose'
import TaskHistory from './models/TaskHistory.js'
import db from './server.js'

exports.handler = async (event,context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try{
        const data = JSON.parse(event.body);
        const his = await TaskHistory.find({startTime:{$gte: data.startTime,$lte: data.endTime}}).sort({startDate:1})
            .populate('task');
        const response ={
                msg:"Histories found",
                data: his
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