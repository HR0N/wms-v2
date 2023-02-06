import React from "react";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";


export const Layout = ({children})=>{
    return  (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    );
};

export const withLayout = (Component)=>{
    return function (props) {
        return  (
            <Layout>
                <Component {...props}/>
            </Layout>
        );
    }
};
