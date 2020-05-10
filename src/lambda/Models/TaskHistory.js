import mongoose from 'mongoose'


const taskHisScheme = new mongoose.Schema({
    startTime: Number,
    duration: Number,
    task: {type: mongoose.ObjectId,ref: 'Task'}
});
const TaskHistory = mongoose.model('TaskHistory',taskHisScheme);

export default TaskHistory;