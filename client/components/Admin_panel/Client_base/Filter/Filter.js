import React from "react";
import ss from "./Filter.module.scss"
import Filter_item from "@/components/Admin_panel/Client_base/Filter/Filter_item";


const Filter = ({statuses, categories}) => {
    return (
        <>
            <div className={ss.filter}>

                {statuses && <Filter_item filter_list={statuses}>Статус</Filter_item>}
                {categories && <Filter_item filter_list={categories}>Категорії</Filter_item>}

            </div>
        </>
    );
};

export default Filter;