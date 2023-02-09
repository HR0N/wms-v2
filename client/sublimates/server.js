import LocalStorage from "./localStorage";
import axios from 'axios';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";


class ServerClass {
    constructor() {
        this.devUrl = "http://127.0.0.1:8000/";
        this.prodUrl = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

        this.localStorage = new LocalStorage();
        this.axios = axios.create({
            baseURL: this.prodUrl,
            timeout: 5000,
            headers: {
                'X-Requested-Width': 'XMLHttpRequest',
            },
            withCredentials: true,
        });
    }

    registration(data){
        let {name, email, password, password_confirmation} = data;
        this.axios.get('sanctum/csrf-cookie')
            .then(res => {
                this.axios.post('api/register',
                    {name, email, password, password_confirmation})
                    .then(res =>{
                        console.log(res);
                    })
            });
    }


    login(data, callbackError = ()=>{}, callbackSuccess = ()=>{}){
        let {email, password} = data;
        this.axios.get('sanctum/csrf-cookie')
            .then(res => {
                this.axios.post('api/login', {email, password})
                    .catch((err)=>{return callbackError(err);})
                    .then(res =>{
                        console.log(res);
                        callbackSuccess(res);
                        this.localStorage.save_user(res);
                    });
            });
    }


    with_token(){
        this.axios.get('sanctum/csrf-cookie')
            .then(res => {
                this.axios.get('api/test'
                    , {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${this.localStorage.token()}`,
                        },})
                    .then(res =>{
                        console.log(res);
                    })
            });
    }

}
export default ServerClass;