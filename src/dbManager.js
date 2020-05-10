
export const getTasks = async () => {
    return fetch('/.netlify/functions/readTask',{method:'post'}).then(res => res.json()).then(res =>{
        var data = res.data;
        var tasks = [];
        for(let t of data){
            tasks.push(t);
        }
        return tasks;
    }
    );
};
export const addTask = async (name) => {
    return fetch('/.netlify/functions/addTask',{
        method: 'post',
        body: JSON.stringify({name:name})
    }).then(res => res.json()).then(res=>res.data);
}
export const findTask = async(id) => {
    return fetch('/.netlify/functions/findTask',{
        method:'post',
        body: id
    });
}
export const addHistory = async(taskID,duration,startTime) => {
    return fetch('/.netlify/functions/addHistory',{
        method:'post',
        body: JSON.stringify({
            taskID: taskID,
            duration: duration,
            startTime:startTime
        })
    });
}