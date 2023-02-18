import React, {useEffect, useRef, useState} from "react";
import ss from "./Filter.module.scss"
import $ from 'jquery';
import InputClass from "@/sublimates/input";

const input = new InputClass();

const height = elem => $(elem.current).css('height').replace('px', '');
const margin_top = elem => $(elem.current).css('margin')[0].replace('px', '');
const padding_top = elem => $(elem.current).css('padding')[0].replace('px', '');
const elem_children_count = elem => $(elem.current).children().length;


const Filter_item = ({filter_list, children, filterList, setFilterList}) => {


    const render_filter_list = arr => arr.map((v, k) => <label key={k} ref={label}><li className={`${ss.list_item}`}><input
        value={checkbox.val}
        onChange={e => {checkbox.setValue($(e.target).prop('checked')); toggle_item_filter($(e.target).prop('checked'), v);}}
        type="checkbox" name={v.id}/>{v.category}</li></label>);


    const [show, setShow] = useState(false);
    const ul = useRef(null);
    const label = useRef(null);
    const checkbox = input.init(false);


    const toggle_ul_height = () => {
        let full_height = (+height(label) + +margin_top(label) + +padding_top(label)*2) * elem_children_count(ul);
        show ? $(ul.current).css({'max-height': full_height}) : $(ul.current).css({'max-height': 0});
    };


    const toggle_item_filter = (checked, v) => {
        if(checked && filterList.indexOf(v.id) < 0){
            let new_arr = [...filterList];
            new_arr.push(v.id);
            setFilterList(new_arr);
        }else if(!checked && filterList.indexOf(v.id) > -1){
            let new_arr = [...filterList];
            new_arr = new_arr.filter(v2 => v2 !== v.id);
            setFilterList(new_arr);
        }
    };



    useEffect(() => {
        if(filter_list) toggle_ul_height();
    }, [show]);
    return (
        <>
            <div className={`${ss.item}`}>
                <div className={`${ss.title}`}
                     onClick={() => {setShow(!show)}}
                >{children} <i className={`fa-solid fa-chevron-up ${show && ss.rotate_i}`}></i></div>
                <ul ref={ul} className={`${ss.list}`}>
                    {filter_list && render_filter_list(filter_list)}
                </ul>
                
            </div>
        </>
    );
};

export default Filter_item;