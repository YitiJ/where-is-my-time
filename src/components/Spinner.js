import React from 'react';
import Loader from 'react-loader-spinner'

const Spinner = ({show}) =>
    <div>
        {show ? (<div className="modal z-40"></div>) : (null)}
        <Loader type="Circles" color="#9098C6" visible={show} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"/>
    </div>;

export default Spinner;