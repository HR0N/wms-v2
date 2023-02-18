import React, {useEffect, useState} from "react";
import ss from "@/styles/admin_panel.module.scss"
import Head from "next/head";
import Aside from "@/components/Aside/Aside";
import Client_base from "@/components/Admin_panel/Client_base/Client_base";
import {withAdmin_layout} from "@/components/Layout/Admin_layout";
import Filter from "@/components/Admin_panel/Client_base/Filter/Filter";
import ServerClass from "@/sublimates/server";
import AuthClass from "@/sublimates/authClass";


const auth = new AuthClass();
const server = new ServerClass();


const statuses = [
    {id: 'none', category: 'Ніякого'},
    {id: 'work', category: 'Працюємо'},
    {id: 'worked_well_before', category: 'Працювали, добре'},
    {id: 'worked_before_bad', category: 'Працювали, погано'},
    {id: 'potential_client', category: 'Потенційний клієнт'},
    {id: 'inadequate', category: 'Неадекватний'},
];
const categoriesD = [
    {
        category: "Kabanchik",
        color: "4",
        created_at: "2023-02-16T16:24:42.000000Z",
        id: 16,
        updated_at: "2023-02-16T16:24:42.000000Z",
        user: "1",
    },
    {
        category: "Kill me",
        color: "0",
        created_at: "2023-02-16T17:02:16.000000Z",
        id: 23,
        updated_at: "2023-02-16T17:02:16.000000Z",
        user: "1",
    },
    {
        category: "blue",
        color: "5",
        created_at: "2023-02-16T17:02:16.000000Z",
        id: 30,
        updated_at: "2023-02-16T17:02:16.000000Z",
        user: "1",
    },
];
const clientsD = [
    {
        categories: "[\"16\"]",
        comment: null,
        created_at: "2023-02-17T11:22:35.000000Z",
        date: "2023-02-17",
        id: 5,
        name: null,
        occupation: null,
        phone: "0636056640",
        status: "none",
        updated_at: "2023-02-17T11:22:35.000000Z",
        user: "1",
    },
    {
        categories: "[\"empty\"]",
        comment: null,
        created_at: "2023-02-17T12:48:02.000000Z",
        date: "2023-02-17",
        id: 10,
        name: null,
        occupation: null,
        phone: "0636056641",
        status: "none",
        updated_at: "2023-02-17T12:48:02.000000Z",
        user: "1",
    },
    {
        categories: "[\"30\"]",
        comment: null,
        created_at: "2023-02-17T14:05:45.000000Z",
        date: "2023-02-17",
        id: 17,
        name: null,
        occupation: null,
        phone: "0636056642",
        status: "none",
        updated_at: "2023-02-17T14:05:45.000000Z",
        user: "1",
    },
];


const sort_object_by_value_alphabet = arr => {
    return arr.sort((a, b) => a.category.localeCompare(b.category));
};


const load_categories = (setCategories) => {
    server.get_client_base_categories(
        (err) => {console.log(err);},
        (res) => {setCategories(sort_object_by_value_alphabet(res.data))})
};
const load_clients = (setClients) => {
    server.get_contact_cards(
        (err) => {console.log(err);},
        (res) => {if(res.data.length > 0){setClients(res.data)}})
};


const client_base_page = () => {


    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState(null);
    const [clients, setClients] = useState(null);
    const [filterStatuses, setFilterStatuses] = useState([]);
    const [filterCategories, setFilterCategories] = useState([]);


    useEffect(() => {

        setUser(auth.user());

        if(user && window.location.hostname !== 'localhost'){
            load_categories(setCategories);
            load_clients(setClients);
        }

    }, [user]);


    return (
        <>
            <Head>
                <title>Client base</title>
            </Head>
            <div className={ss.admin_panel}>

                <div className={`${ss.aside}`}>
                    <Aside/>
                    <Filter
                        statuses={statuses}
                        categories={categories}
                        filterStatuses={filterStatuses}
                        setFilterStatuses={setFilterStatuses}
                        filterCategories={filterCategories}
                        setFilterCategories={setFilterCategories}
                    />
                </div>


                <div className={ss.main}>
                    <Client_base
                        statuses={statuses}
                        clients={clients}
                        categories={categories}
                        load_clients={() => {load_clients(setClients)}}
                        filterStatuses={filterStatuses}
                        filterCategories={filterCategories}
                    />
                </div>

            </div>
        </>
    );
};

export default withAdmin_layout(client_base_page);