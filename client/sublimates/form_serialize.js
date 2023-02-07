import $ from "jquery";
import ValidatorClass from "@/sublimates/validator";
const validator = new ValidatorClass();

export default class Form_serialize {


    fetch_field(data, field){
        field && field.map((k, v)=>{
            data[$(v).attr('name')] = $(v).val();
        });
    }

    serialize_form(event){  // inputs must have name
        let data = {};
        let form = event.target;
        let input = $(form).find('input');
        let textarea = $(form).find('textarea');
        let select = $(form).find('select');

        this.fetch_field(data, input);
        this.fetch_field(data, textarea);
        this.fetch_field(data, select);

        return data;
    }

    serialize_sterilize(event){
        let data = this.serialize_form(event);
        Object.keys(data).map((v, k)=>{
            data[v] = validator.escape(validator.trim(data[v]));
        });
        return data;
    }
}