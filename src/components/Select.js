import React from 'react';
import arrow from './../assets/arrow.svg'
class Select extends React.Component{
    
    render(){
        return (
            <div className="flex flex-row w-1/3 h-20 mx-auto">
                <input className="flex-auto px-12 text-gray-1 text-3xl outline-none bg-blue-1 focus:bg-blue-2 rounded-l-lg focus:shadow-outline z-10 placeholder-gray-1"
                placeholder="Select task"/>
                <div className="h-20 w-20 bg-blue-3 ml-auto rounded-r-lg flex">
                <img className="mx-auto self-center" src={arrow} />
                </div>
            </div>
        );
    }
}

export default Select;