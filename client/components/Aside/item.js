import React, {useEffect, useRef, useState} from "react";
import ss from "@/components/Aside/Aside.module.scss";
import $ from 'jquery';


const Item = ({cn, submenu = false, children, height = 25, show = false}) => {

    const ul = useRef(null);
    let show2 = show;


    useEffect(() => {
        submenu_toggle();
    }, []);


    const submenu_toggle = () => {
        let qUl = $(ul.current);
        let submenu_length = null;

        if(submenu){submenu_length = submenu.props.children.length}

        if(show2){qUl.css({'max-height': `${height * submenu_length}px`})}
        else{qUl.css({'max-height': `0`})}
    };


    const clickHandler = () => {
        show2 = !show2;
        submenu_toggle();
    };

    return (
        <>
            <li
                onClick={() => {clickHandler()}}
                className={cn}>{children}</li>

            {submenu && <ul className={`${ss.sub_list}`} ref={ul}>{submenu}</ul>}
        </>
    );
};

export default Item;