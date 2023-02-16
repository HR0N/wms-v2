import React, {useEffect, useState} from "react";
import ss from "@/styles/admin_panel.module.scss"
import Head from "next/head";
import Aside from "@/components/Aside/Aside";
import {withAdmin_layout} from "@/components/Layout/Admin_layout";
import Categories from "@/components/Admin_panel/Categories/Categories";
import ServerClass from "@/sublimates/server";
import AuthClass from "@/sublimates/authClass";


const auth = new AuthClass();
const server = new ServerClass();

// let categories = {
//     kabanchik: 'Kaban parsing',
//     first: 'first',
//     second: 'second',
//     third: 'third',
//     fourth: 'fourth',
//     fifth: 'fifth',
//     sixth: 'sixth',
// };
// categories = sort_object_by_value_alphabet(categories);

const sort_object_by_value_alphabet = arr => {
    // Object.keys(obj).sort((a, b) => obj[a].localeCompare(obj[b])).forEach(v => clone[v] = obj[v]);
    return arr.sort((a, b) => a.category.localeCompare(b.category));
};

const load_data = (setCategories) => {
    server.get_client_base_categories(
        (err) => {console.log(err);},
        (res) => {setCategories(sort_object_by_value_alphabet(res.data))})
};

const client_base_page = () => {


    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState(null);


    useEffect(() => {

        setUser(auth.user());

        if(user && window.location.hostname !== '1localhost') load_data(setCategories);

    }, [user]);

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
                        load_data={() => {load_data(setCategories)}}
                    />
                </div>

            </div>
        </>
    );
};

export default withAdmin_layout(client_base_page);