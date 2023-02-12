import React, {useEffect, useRef, useState} from "react";
import ss from "@/components/Aside/Aside.module.scss";
import $ from 'jquery';


const Item = ({cn, submenu = false, children, height = 25, show = false}) => {

    const [forceRender, setForceRender] = useState(false);
    const ul = useRef(null);
    let show2 = show;
    let margin = 5;


    useEffect(() => {
        submenu_toggle();
        document.body.style.cssText = `--asideLiMargin: ${margin}px`;
    }, []);


    const submenu_toggle = () => {
        let qUl = $(ul.current);
        let submenu_length = null;
        let padding_top = null;

        if(submenu){
            submenu_length = submenu.props.children.length;
            height = ($(ul.current).find('li').height() + margin);
            padding_top = +$(ul.current).find('li').css('padding').split(' ')[0].replace('px', '');
        }
        height+= padding_top*2;

        if(show2){qUl.css({'max-height': `${height * submenu_length + margin}px`})}
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