import React from "react";
import ss from "./Pagination.module.scss"


const Pagination = ({postsPerPage, totalPosts, paginate, currentPage}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <>
            <ul className={ss.pagination}>
                {pageNumbers.map(number => (
                    <li key={number}
                        style={{'backgroundColor':`${currentPage === number ? '#c4c3d3' : ''}`}}
                        onClick={() => {paginate(number);}}
                    >
                        <div>
                            {number}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Pagination;