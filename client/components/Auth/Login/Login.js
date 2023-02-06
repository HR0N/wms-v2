import React from "react";
import ss from "./Login.module.scss"


const Login = (props) => {
    return (
        <>
            <div className={ss.login}>
                <div className={ss.title}>Login form</div>

                <div className={ss.inputs}>
                    <div className={ss.input}><input className={`form-control`} type="text" placeholder={'email'}/></div>

                    <div className={ss.input}><input className={`form-control`} type="text" placeholder={'password'}/></div>
                </div>

                <div className={ss.footer}>
                    <div className={ss.buttons}>
                        <div className={`btn`}
                        onClick={() => {props.switch(!props.login)}}
                        >Register</div>
                        <div className={`btn btn-info ${ss.submit}`}>Login</div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Login;