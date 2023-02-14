import React from "react";
import Aside from "@/components/Aside/Aside";
import Head from "next/head";
import ss from "@/styles/admin_panel.module.scss"
import {withAdmin_layout} from "@/components/Layout/Admin_layout";
import Filter from "@/components/Admin_panel/Client_base/Filter/Filter";


const Index = () => {
    return (
        <>
            <Head>
                <title>Admin panel</title>
            </Head>
            <div className={ss.admin_panel}>

                <div className={`${ss.aside}`}>
                    <Aside/>
                </div>


                <div className={ss.main}>
                    empty
                </div>

            </div>
        </>
    );
};

export default withAdmin_layout(Index);