import LocalStorageClass from "@/sublimates/localStorage";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";


export default class AuthClass {
    constructor() {
        this.ls = new LocalStorageClass();
        this.router = useRouter();
        this.admin = useState(false);

        this.event();
    }

    #get_user_catch(){
        if(!this.router.isReady) return;
        const query = this.router.query;
        query && query.name ? this.ls.save_user(query) : false;
        window.history.pushState(null, '', '/');
    }
    user_fresh(){
        if(!this.user()){
            this.#get_user_catch();
            this.checkAdmin();
        }
        else{return this.user();}
    }

    user = () =>{
        let user = this.ls.get('ref-selector');
        return user && user.name ? user : false;
    };
    name = () => this.user() ? this.user().name : false;
    role = () => this.user() ? this.user().role : false;
    checkAdmin = () => this.user() && this.user().role === 'admin' ? this.admin = true : this.admin = false;
    token = () => this.user() ? this.user().token : false;

    isAdmin = () => this.admin;

    event(){
        useEffect(() => {
            console.log('fuck');
        }, []);
    }

}
