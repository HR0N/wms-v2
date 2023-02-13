import React from "react";
import ss from "@/styles/admin_panel.module.scss"
import Head from "next/head";
import Aside from "@/components/Aside/Aside";
import Client_base from "@/components/Admin_panel/Client_base/Client_base";
import {withAdmin_layout} from "@/components/Layout/Admin_layout";


const client_base_page = () => {
    return (
        <>
            <Head>
                <title>Client base</title>
            </Head>
            <div className={ss.admin_panel}>
                <Aside/>
                <div className={ss.main}>
                    <Client_base/>
                </div>
            </div>
        </>
    );
};

export default withAdmin_layout(client_base_page);