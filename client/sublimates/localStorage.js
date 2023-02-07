class LocalStorageClass {
    constructor() {
        try{this.ls = window.localStorage;}catch{console.log(`couldn't load local storage`);}
    }

    // save user
    save_user(res){
        this.set('ref-selector', res.data);
    }

    // get value by key
    get(key){
        return JSON.parse(this.ls.getItem(key));
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
}

export default LocalStorageClass;