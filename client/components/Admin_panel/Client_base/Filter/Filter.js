import React from "react";
import ss from "./Filter.module.scss"
import Filter_item from "@/components/Admin_panel/Client_base/Filter/Filter_item";


const Filter = ({statuses, categories, filterStatuses, setFilterStatuses, filterCategories, setFilterCategories}) => {
    return (
        <>
            <div className={ss.filter}>

                {statuses &&
                <Filter_item
                    filter_list={statuses}
                    filterStatuses={filterStatuses}
                    setFilterStatuses={setFilterStatuses}
                >Статус</Filter_item>
                }


                {categories &&
                <Filter_item
                    filter_list={categories}
                    filterCategories={filterCategories}
                    setFilterCategories={setFilterCategories}
                >Категорії</Filter_item>
                }

            </div>
        </>
    );
};

export default Filter;