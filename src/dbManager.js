
export const getTasks = () => {
    return fetch('/.netlify/functions/readTask',{method:'post'}).then(res => {
        if(!res.ok) throw Error("Http request error:" + res.status);
        return res.json()
    });
};
export const addTask = (name) => {
    return fetch('/.netlify/functions/addTask',{
        method: 'post',
        body: JSON.stringify({name:name})
    }).then(res => {
        if(!res.ok) throw Error("Http request error:" + res.status);
        return res.json();
    });
}

export const findTask = async(id) => {
    return fetch('/.netlify/functions/findTask',{
        method:'post',
        body: id
    }).then(res=>{
        if(!res.ok) throw Error("Http request error:" + res.status);
        return res.json();
    });
}

export const editTask = async(task) => {
    return fetch('/.netlify/functions/editTask',{
        method:'post',
        body: JSON.stringify(task)
    }).then(res=>{
        if(!res.ok) throw Error("Http request error:" + res.status);
        return res.json();
    });
}

export const addHistory = (taskID,duration,startTime) => {
    return fetch('/.netlify/functions/addHistory',{
        method:'post',
        body: JSON.stringify({
            taskID: taskID,
            duration: duration,
            startTime:startTime
        })
    }).then(res=>{
        if(!res.ok) throw Error("Http request error:" + res.status);
        return res.json();
    });
}

export const findHistory = (startTime,endTime) => {
    return fetch('/.netlify/functions/findHistory',{
        method:'post',
        body: JSON.stringify({
            startTime:startTime,
            endTime:endTime
        })
    }).then(res=>{
        if(!res.ok) throw Error("Http request error:" + res.status);
        return res.json();
    });
}