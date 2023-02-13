import React from 'react';
// import ss from './loader_1.scss';

const Loader_1 = props => {
    return(
        <div className="Loader-wrapper">
            <div className='lds-ellipsis'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loader_1;