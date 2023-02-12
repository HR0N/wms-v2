import React from "react";
import {Footer} from "../Footer/Footer";
import ss from "./layout.module.scss"
import {Header_II} from "@/components/Header/Header_II";


export const Admin_layout = ({children}) => {
    return (
        <>
            <Header_II/>
                <div className={ss.layout}>
                    {children}
                </div>
            <Footer/>
        </>
    );
};

export const withAdmin_layout = (Component) => {
    return function (props) {
        return (
            <Admin_layout>
                <Component {...props}/>
            </Admin_layout>
        );
    }
};
