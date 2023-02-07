import LocalStorage from "./localStorage";
import axios from 'axios';


class ServerClass {
    constructor() {
        this.devUrl = "http://127.0.0.1:8000/";
        this.prodUrl = "https://temp1b.evilcode.space/";

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
                this.axios.post('api/login', {email: email, password: password})
                    .catch((err)=>{return callbackError(err);})
                    .then(res =>{
                        callbackSuccess(res);
                        this.localStorage.save_user(res);
                    });
            });
    }


    with_token(){
        this.axios.get('sanctum/csrf-cookie')
            .then(res => {
                this.axios.get('api/get'
                    , {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+this.localStorage.get('res-selector').token,
                        },})
                    .then(res =>{
                        console.log(res);
                    })
            });
    }

}
export default ServerClass;