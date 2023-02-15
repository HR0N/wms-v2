export default class LocalStorageClass {
    constructor() {
        this.storage = typeof window !== "undefined" ? localStorage : false;
    }

    get_item(key){
        if(!this.storage) return;
        return this.storage.getItem(key);
    }

    set_item(key, value){
        if(!this.storage) return;
        return this.storage.setItem(key, value);
    }

    remove_item(key){
        if(!this.storage) return;
        return this.storage.removeItem(key);
    }

    clear(){
        if(!this.storage) return;
        this.storage.clear();
    }

    length(){
        if(!this.storage) return;
        return this.storage.length;
    }

}
