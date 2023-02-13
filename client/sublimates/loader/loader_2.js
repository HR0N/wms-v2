import React from 'react';

const Loader_2 = ({color}) => {
    return(
        <div className="Loader-wrapper">
            <div className={`lds-dual-ring ${color && color}`}></div>
        </div>
    );
};

export default Loader_2;