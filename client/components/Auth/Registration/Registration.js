import React from "react";
import ss from "./Registration.module.scss"


const Registration = (props) => {
    return (
        <>
            <div className={ss.registration}>
                <div className={ss.title}>Registration form</div>

                <div className={ss.inputs}>
                    <div className={ss.input}><input className={`form-control`} type="email" placeholder={'email'}/></div>

                    <div className={ss.input}><input className={`form-control`} type="text" placeholder={'username'}/></div>

                    <div className={ss.input}><input className={`form-control`} type="password" placeholder={'password'}/></div>

                    <div className={ss.input}><input className={`form-control`} type="password" placeholder={'confirm password'}/></div>
                </div>

                <div className={ss.footer}>
                    <div className={ss.buttons}>
                        <div className={`btn`}
                             onClick={() => {props.switch(!props.login)}}
                        >Login</div>
                        <div className={`btn btn-info ${ss.submit}`}>Register</div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Registration;