import React from "react";
import ss from "@/styles/admin_panel.module.scss"
import Head from "next/head";
import Aside from "@/components/Aside/Aside";
import Client_base from "@/components/Admin_panel/Client_base/Client_base";
import {withAdmin_layout} from "@/components/Layout/Admin_layout";
import Filter from "@/components/Admin_panel/Client_base/Filter/Filter";
import Categories from "@/components/Admin_panel/Categories/Categories";


let categories = {
    kabanchik: 'Kaban parsing',
    first: 'first',
    second: 'second',
    third: 'third',
    fourth: 'fourth',
    fifth: 'fifth',
    sixth: 'sixth',
};
const sort_object_by_value_alphabet = obj => {
    let clone = {};
    Object.keys(obj).sort((a, b) => categories[a].localeCompare(categories[b])).forEach(v => clone[v] = categories[v]);
    return clone;
};
categories = sort_object_by_value_alphabet(categories);

const client_base_page = () => {
    return (
        <>
            <Head>
                <title>Client base</title>
            </Head>
            <div className={ss.admin_panel}>

                <div className={`${ss.aside}`}>
                    <Aside/>
                </div>


                <div className={ss.main}>
                    <Categories
                        categories={categories}
                    />
                </div>

            </div>
        </>
    );
};

export default withAdmin_layout(client_base_page);