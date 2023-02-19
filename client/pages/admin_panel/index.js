import React from "react";
import Aside from "@/components/Aside/Aside";
import Head from "next/head";
import ss from "@/styles/admin_panel.module.scss"
import {withAdmin_layout} from "@/components/Layout/Admin_layout";
import Filter from "@/components/Admin_panel/Client_base/Filter/Filter";
import Index_page from "@/components/Admin_panel/Index_page/Index_page";
import Aside_links from "@/components/Admin_panel/Index_page/Aside_links/Aside_links";


const Index = () => {
    return (
        <>
            <Head>
                <title>Admin panel</title>
            </Head>
            <div className={ss.admin_panel}>

                <div className={`${ss.aside}`}>
                    <Aside/>
                    <Aside_links/>
                </div>


                <div className={ss.main}>
                    <Index_page/>
                </div>

            </div>
        </>
    );
};

export default withAdmin_layout(Index);