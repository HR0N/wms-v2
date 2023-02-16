import React, {useEffect, useRef, useState} from "react";
import ss from "./Filter.module.scss"
import $ from 'jquery';




const height = elem => $(elem.current).css('height').replace('px', '');
const margin_top = elem => $(elem.current).css('margin')[0].replace('px', '');
const padding_top = elem => $(elem.current).css('padding')[0].replace('px', '');
const elem_children_count = elem => $(elem.current).children().length;

const Filter_item = ({filter_list, children}) => {

    const render_filter_list = arr => arr.map((v, k) => <label key={k} ref={label}><li className={`${ss.list_item}`}><input type="checkbox" name={v.id}/>{v.category}</li></label>);

    const [show, setShow] = useState(false);
    const ul = useRef(null);
    const label = useRef(null);

    const toggle_ul_height = () => {
        let full_height = (+height(label) + +margin_top(label) + +padding_top(label)*2) * elem_children_count(ul);
        show ? $(ul.current).css({'max-height': full_height}) : $(ul.current).css({'max-height': 0});
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
                    {/*<label><li ref={li} className={`${ss.list_item}`}><input type="checkbox" name={0}/>status</li></label>*/}
                    {filter_list && render_filter_list(filter_list)}
                </ul>
                
            </div>
        </>
    );
};

export default Filter_item;