import React from "react";
import Aside from "@/components/Aside/Aside";
import Head from "next/head";
import ss from "@/styles/admin_panel.module.scss"
import {withAdmin_layout} from "@/components/Layout/Admin_layout";


const Admin_panel = () => {
    return (
        <>
            <Head>
                <title>Admin panel</title>
            </Head>
            <div className={ss.admin_panel}>
                <Aside/>
                <div className={ss.main}>
                    <p>Admin panel main content</p>
                </div>
            </div>
        </>
    );
};

export default withAdmin_layout(Admin_panel);