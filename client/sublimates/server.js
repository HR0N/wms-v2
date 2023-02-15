import axios from 'axios';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

class ServerClass {
    constructor() {
        this.devUrl = "http://127.0.0.1:8000/";
        this.prodUrl = process.env.NEXT_PUBLIC_SERVER_DOMAIN;

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
                    });
            });
    }


    with_token(token){
        this.axios.get('sanctum/csrf-cookie')
            .then(res => {
                this.axios.get('api/test'
                    , {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },})
                    .then(res =>{
                        console.log(res);
                    })
            });
    }

     /*
     |--------------------------------------------------------------------------
     | Client base
     |--------------------------------------------------------------------------
     |
     | Block CRUD requests to API backend.
     |
     | get_contact_cards    -   require your mind...
     | create_contact_card  -   require only data
     | get_contact_card     -   require id
     | update_contact_card  -   require data, id
     | destroy_contact_card -   require id
     | search_contact_card  -   require phone
     |
     |
     |
     */
    get_contact_cards(callbackError = ()=>{}, callbackSuccess = ()=>{}){
        this.axios.get('sanctum/csrf-cookie')
            .then(res => {
                this.axios.post('api/get_contact_cards')
                    .catch((err)=>{return callbackError(err);})
                    .then(res =>{
                        console.log(res);
                        callbackSuccess(res);
                    });
            });
    }
    store_contact_card(data, callbackError = ()=>{}, callbackSuccess = ()=>{}){
        this.axios.get('sanctum/csrf-cookie')
            .then(res => {
                this.axios.post('api/create_contact_card', data)
                    .catch((err)=>{return callbackError(err);})
                    .then(res =>{
                        console.log(res);
                        callbackSuccess(res);
                    });
            });
    }
    get_contact_card(id, callbackError = ()=>{}, callbackSuccess = ()=>{}){
        this.axios.get('sanctum/csrf-cookie')
            .then(res => {
                this.axios.post(`api/get_contact_card/${id}`)
                    .catch((err)=>{return callbackError(err);})
                    .then(res =>{
                        console.log(res);
                        callbackSuccess(res);
                    });
            });
    }
    update_contact_card(data, id, callbackError = ()=>{}, callbackSuccess = ()=>{}){
        this.axios.get('sanctum/csrf-cookie')
            .then(res => {
                this.axios.post(`api/update_contact_card/${id}`, data)
                    .catch((err)=>{return callbackError(err);})
                    .then(res =>{
                        console.log(res);
                        callbackSuccess(res);
                    });
            });
    }
    destroy_contact_card(id, callbackError = ()=>{}, callbackSuccess = ()=>{}){
        this.axios.get('sanctum/csrf-cookie')
            .then(res => {
                this.axios.post(`api/destroy_contact_card/${id}`)
                    .catch((err)=>{return callbackError(err);})
                    .then(res =>{
                        console.log(res);
                        callbackSuccess(res);
                    });
            });
    }
    search_contact_card(phone, callbackError = ()=>{}, callbackSuccess = ()=>{}){
        this.axios.get('sanctum/csrf-cookie')
            .then(res => {
                this.axios.post(`api/search_contact_card/${phone}`)
                    .catch((err)=>{return callbackError(err);})
                    .then(res =>{
                        console.log(res);
                        callbackSuccess(res);
                    });
            });
    }
    store_client_base_category(data, callbackError = ()=>{}, callbackSuccess = ()=>{}){
        this.axios.get('sanctum/csrf-cookie')
            .then(res => {
                this.axios.post('api/create_client_base_category', data)
                    .catch((err)=>{return callbackError(err);})
                    .then(res =>{
                        console.log(res);
                        callbackSuccess(res);
                    });
            });
    }
    destroy_client_base_category(id, callbackError = ()=>{}, callbackSuccess = ()=>{}){
        this.axios.get('sanctum/csrf-cookie')
            .then(res => {
                this.axios.post(`api/delete_client_base_category/${id}`)
                    .catch((err)=>{return callbackError(err);})
                    .then(res =>{
                        console.log(res);
                        callbackSuccess(res);
                    });
            });
    }

}
export default ServerClass;