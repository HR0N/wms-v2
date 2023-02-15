import React from "react";
import ss from "./Registration.module.scss"
import InputClass from "@/sublimates/input";
import ValidatorClass from "@/sublimates/validator";
import ErrorsClass from "@/sublimates/errors";
import ServerClass from "@/sublimates/server";
import ScrollToggleClass from "@/sublimates/scroll_toggle";
import Form_serialize from "@/sublimates/form_serialize";

const input = new InputClass();
const validator = new ValidatorClass();
const errors = new ErrorsClass();
const scroll = new ScrollToggleClass();
const server = new ServerClass();
const serialize = new Form_serialize();


const Registration = (props) => {

    const email = input.init('');
    const username = input.init('');
    const password = input.init('');
    const password_confirmation = input.init('');


    const check_validity = ()=>{
        return(validator.isEmail(email.val)
            && validator.isLength(username.val, 2, 40)
            && validator.isLength(password.val, 8, 40)
            && validator.isAlphanumeric(password.val)
            && validator.isPasEquals(password.val, password_confirmation.val))
    };


    const submit = (e) => {
        e.preventDefault();
        if(check_validity()){
            let data = serialize.trim_values(e);
            server.registration(data);
        }
    };

    return (
        <>
            <form className={ss.registration} onSubmit={e => {submit(e)}}>
                <div className={ss.title}>Registration form</div>

                <div className={ss.inputs}>
                    <div className={ss.input}>
                        <label>
                            <div className={ss.error}>
                                {email.touched
                                && validator.isEmailMsg(email.val)}
                            </div>
                            <input className={`form-control`} type="email" placeholder={'email'} name={'email'}
                            value={email.val} onChange={e => {email.onChange(e)}} onBlur={e => {email.onBlur(e)}}/>
                        </label>
                    </div>


                    <div className={ss.input}>
                        <label>
                            <div className={ss.error}>
                                {username.touched
                                && validator.isLengthMsg(username.val, 2, 40)}
                            </div>
                            <input className={`form-control`} type="text" placeholder={'username'} name={'name'}
                            value={username.val} onChange={e => {username.onChange(e)}} onBlur={e => {username.onBlur(e)}}/>
                        </label>
                    </div>


                    <div className={ss.input}>
                        <label>
                            <div className={ss.error}>
                                {password.touched
                                ? (validator.isLengthMsg(password.val, 8, 40)
                                    ? validator.isLengthMsg(password.val, 8, 40)
                                    : validator.isAlphanumericMsg((password.val)))
                                : false}
                            </div>
                            <input className={`form-control`} type="password" placeholder={'password'} name={'password'}
                            value={password.val} onChange={e => {password.onChange(e)}} onBlur={e => {password.onBlur(e)}}/>
                        </label>
                    </div>


                    <div className={ss.input}>
                        <label>
                            <div className={ss.error}>
                                {password_confirmation.touched
                                && validator.isPasEqualsMsg(password.val, password_confirmation.val)}
                            </div>
                            <input className={`form-control`} type="password" placeholder={'confirm password'} name={'password_confirmation'}
                            value={password_confirmation.val} onChange={e => {password_confirmation.onChange(e)}} onBlur={e => {password_confirmation.onBlur(e)}}/>
                        </label>
                    </div>
                </div>

                <div className={ss.footer}>
                    <div className={ss.buttons}>
                        <div className={`btn`}
                             onClick={() => {props.switch(!props.login)}}
                        >Login</div>
                        <button type={'submit'} className={`btn btn-info ${ss.submit}`}>Register</button>
                    </div>
                </div>

            </form>
        </>
    );
};

export default Registration;