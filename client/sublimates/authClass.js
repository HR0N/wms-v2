import {useRouter} from "next/router";
import {useLocalStorage} from "@/sublimates/hooks/useLocalStorage";
import LocalStorageClass from "@/sublimates/localStorageClass";


export default class AuthClass {
    constructor() {
        this.storage = new LocalStorageClass();
    }

    #get_url_data(router, user, setUser){
        if(!router.isReady) return;

        const query = router.query;

        Object.keys(query).length > 0 && !user ? setUser(query) : false;
        window.history.pushState(null, '', '/');
    }


    page_load = () => {
        const router = useRouter();
        const [user, setUser] = useLocalStorage(null, 'user');

        this.#get_url_data(router, user, setUser);
    };

    user = () => this.storage.get_item('user');

    is_admin = () => {
        let user = this.storage.get_item('user');
        if(!user) return;
        return user !== 'null' ? JSON.parse(user).role === 'admin' : false;
    };


}
