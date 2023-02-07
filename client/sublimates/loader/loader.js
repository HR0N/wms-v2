import React from 'react';
// import ss from './loader.scss';

const Loader = props => {
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

export default Loader;