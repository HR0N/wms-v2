import React, {useEffect, useRef, useState} from "react";
import ss from "./Header.module.scss"
import Link from "next/link";
import $ from "jquery";

const isMobile = () => window.matchMedia('only screen and (max-width: 426px)').matches;

export const Header = ()=>{

    const [mobile, setMobile] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

    const handleScroll = (header)=>{
        let y = window.scrollY;
        let head = $(header.current);
        if(y > 500 && !head.hasClass(ss.header_fixed)){
            head.addClass(ss.header_fixed);
        }else if(y < 500 && head.hasClass(ss.header_fixed)){
            head.removeClass(ss.header_fixed);
        }
    };

    const header = useRef(null);


    useEffect(() => {
        setMobile(isMobile());

        if(!isMobile()){
            window.addEventListener('scroll', () => {handleScroll(header)});
        }

        let href = window.location.href;
        href = href.slice(0, -1);
        let origin = window.location.origin;
        let delay = 2000;
        if(href !== origin){delay = 1;}

        setTimeout(() => {$(header.current).css({'opacity':'1'})}, delay);
        return window.removeEventListener('scroll', () => {handleScroll(header)});
    }, []);

    return  (
        <>
            <header className={`${ss.header} ${mobile ? (showMenu ? '' : ss.toggle_menu) : false}`} ref={header}>
                <nav>
                    <Link href={'/'}><div className={ss.nav_item}>Home</div></Link>
                    <Link href={'#'}><div className={ss.nav_item}>Another link</div></Link>
                    <Link href={'auth'}><div className={ss.nav_item}>Auth</div></Link>
                </nav>
                {mobile && showMenu ?
                    <i onClick={() => {setShowMenu(!showMenu)}}
                       className={`fa-solid fa-xmark ${ss.header_i}`}> </i> : false}
            </header>
            {mobile && !showMenu ? <i onClick={() => {setShowMenu(!showMenu)}}
                                      style={{'zIndex': 2}} className={`fa-solid fa-bars ${ss.header_i}`}> </i> : false}
        </>
    );
};