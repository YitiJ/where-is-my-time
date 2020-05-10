import mongoose from 'mongoose'


const taskHisScheme = new mongoose.Schema({
    startTime: Number,
    duration: Number,
    taskID: mongoose.ObjectId,
});
const TaskHistory = mongoose.model('TaskHistory',taskHisScheme);

export default TaskHistory;