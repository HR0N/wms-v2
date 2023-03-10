import React from "react";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import ss from "./layout.module.scss"


export const Layout = ({children}) => {
    return (
        <>
            <Header/>
                <div className={ss.layout}>
                    {children}
                </div>
            <Footer/>
        </>
    );
};

export const withLayout = (Component) => {
    return function (props) {
        return (
            <Layout>
                <Component {...props}/>
            </Layout>
        );
    }
};
