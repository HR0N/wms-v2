import React, {useEffect} from "react";
import ss from "./Login.module.scss"
import InputClass from "@/sublimates/input";
import ValidatorClass from "@/sublimates/validator";
import LocalStorageClass from "@/sublimates/localStorage";
import ErrorsClass from "@/sublimates/errors";
import ServerClass from "@/sublimates/server";
import ScrollToggleClass from "@/sublimates/scroll_toggle";
import Form_serialize from "@/sublimates/form_serialize";
import {useRouter} from "next/router";

const input = new InputClass();
const validator = new ValidatorClass();
const errors = new ErrorsClass();
const scroll = new ScrollToggleClass();
const server = new ServerClass();
const localStorage = new LocalStorageClass();
const serialize = new Form_serialize();


const Login = (props) => {

    const email = input.init('');
    const password = input.init('');


    const submit = (e) => {
        e.preventDefault();
        let data = serialize.serialize_form(e);
        server.login(data, (err)=>{console.log(err);});
    };
    const router = useRouter();

    useEffect(() => {
        if(!router.isReady) return;
        const query = router.query;
        console.log((query));
        window.history.replaceState(null, '', '/auth')
    }, [router.isReady, router.query]);

    return (
        <>
            <form className={ss.login} onSubmit={e => {submit(e)}}>
                <div className={ss.title}>Login form</div>

                <div className={ss.inputs}>
                    <div className={ss.input}>
                        <label>
                            <div className={ss.error}>
                                {email.touched
                                && validator.isEmailMsg(email.val)}
                            </div>
                            <input className={`form-control`} type="text" placeholder={'email'} name={'email'}
                            value={email.val} onChange={e => {email.onChange(e)}}
                            onBlur={e => {email.onBlur(e)}}/>
                        </label>
                    </div>

                    <div className={ss.input}>
                        <label>
                            <div className={ss.error}>
                                {password.touched
                                && validator.isLengthMsg(password.val, 8, 40)}
                            </div>
                            <input className={`form-control`} type="text" placeholder={'password'} name={'password'}
                            value={password.val} onChange={e => {password.onChange(e)}}
                            onBlur={e => {password.onBlur(e)}}/>
                        </label>
                    </div>
                </div>

                <div className={ss.footer}>
                    <div className={ss.buttons}>
                        <div className={`btn`}
                        onClick={() => {props.switch(!props.login)}}
                        >Register</div>
                        <button type={'submit'} className={`btn btn-info ${ss.submit}`}>Login</button>
                    </div>
                </div>

            </form>
        </>
    );
};

export default Login;