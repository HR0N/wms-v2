import React, {useEffect, useRef, useState} from "react";
import ss from "./Header.module.scss"
import Link from "next/link";
import $ from "jquery";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import IsMobile from "@/sublimates/isMobile";
import AuthClass from "@/sublimates/auth";
import {useRouter} from "next/router";

const IsMobileClass = new IsMobile();

export const Header = ()=>{
    const auth = new AuthClass();

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
        setMobile(IsMobileClass.mob426px());


        if(!IsMobileClass.mob426px()){window.addEventListener('scroll', () => {handleScroll(header)});}

        return window.removeEventListener('scroll', () => {handleScroll(header)});
    }, []);

    return  (
        <>
            <div className={ss.header_wrapper}>
                <header className={`${ss.header} ${showMenu ? ss.toggle_menu : ''}`} ref={header}>
                    <nav>
                        <div className={ss.col_1}>
                            <Link href={'/'}><div className={ss.nav_item}>Home</div></Link>
                            <Link href={'#'}><div className={ss.nav_item}>Link</div></Link>
                        </div>
                        <div className={ss.col_2}>
                            {1 && <Link href={'admin_panel'}><div className={ss.nav_item}>Admin panel</div></Link>}
                            <Link href={`https://wms.b.evilcode.space/login`} className={ss.auth}><div className={`${ss.nav_item}`}>Auth</div></Link>
                        </div>
                    </nav>
                    {mobile && showMenu ?
                        <i onClick={() => {setShowMenu(!showMenu)}}
                           className={`fa-solid fa-xmark ${ss.header_i}`}> </i> : false}
                </header>


                {mobile && !showMenu ? <i onClick={() => {setShowMenu(!showMenu)}}
                                          style={{'zIndex': 2}} className={`fa-solid fa-bars ${ss.header_i} ${ss.bars_btn}`}> </i> : false}


            </div>
        </>
    );
};