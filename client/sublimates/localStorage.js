class LocalStorageClass {
    constructor() {
        try{this.ls = window.localStorage;}catch{console.log(`couldn't load local storage`);}
    }

    /*
    |--------------------------------------------------------------------------
    | Save response Data
    |--------------------------------------------------------------------------
    |
    | Example text...
    | Here is where you can register API routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | is assigned the "api" middleware group. Enjoy building your API!
    |
    */
    save_user(res){
        this.set('ref-selector', res);
    }

    // get value by key
    get(key){
        let res = this.ls ? this.ls.getItem(key) : false;
        return res && res.name ? JSON.parse(res) : false;
    }

    // set value by key
    set(key, val){
        return this.ls.setItem(key, JSON.stringify(val));
    }

    // delete value by key
    rm(key){
        return this.ls.removeItem(key);
    }

    // delete all!
    clear(){
        return this.ls.clear();
    }

    token(){
        let token = this.get('ref-selector');
        return token ? token.token : false;
    }
}

export default LocalStorageClass;