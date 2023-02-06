import React, {useState} from "react";
import ss from "./Auth.module.scss"
import {Header} from "@/components/Header/Header";
import Login from "@/components/Auth/Login/Login";
import Registration from "@/components/Auth/Registration/Registration";


const Auth_wrapper = () => {

    const [login, setLogin] = useState(true);

    return (
        <>
            <Header/>
            <div className={ss.auth_wrapper}>
                {login
                    ? <Login
                        login={login}
                        switch={setLogin}/>
                    : <Registration
                        login={login}
                        switch={setLogin}/>}
            </div>
        </>
    );
};

export default Auth_wrapper;