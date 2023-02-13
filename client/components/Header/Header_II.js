import React, {useEffect, useRef, useState} from "react";
import ss from "./Header_II.module.scss"
import Link from "next/link";
import $ from "jquery";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const isMobile = () => window.matchMedia('only screen and (max-width: 426px)').matches;

export const Header_II = ()=>{

    const [mobile, setMobile] = useState(null);
    const [showMenu, setShowMenu] = useState(false);


    const header = useRef(null);


    useEffect(() => {
        setMobile(isMobile());
    }, []);

    return  (
        <>
            <div className={ss.header_wrapper}>
                <header className={`${ss.header} ${ss.header_fixed} ${showMenu ? ss.toggle_menu : ''}`} ref={header}>
                    <nav>
                        <div className={ss.col_1}>
                            <Link href={'/'}><div className={ss.nav_item}>Home</div></Link>
                            <Link href={'#'}><div className={ss.nav_item}>Link</div></Link>
                        </div>
                        <div className={ss.col_2}>
                            <Link href={'/admin_panel'}><div className={ss.nav_item}>Admin panel</div></Link>
                            <Link href={'/auth'} className={ss.auth}><div className={`${ss.nav_item}`}>Auth</div></Link>
                        </div>
                    </nav>
                    {mobile && showMenu ?
                        <i onClick={() => {setShowMenu(!showMenu)}}
                           className={`fa-solid fa-xmark ${ss.header_i}`}> </i> : false}
                </header>
                {mobile && !showMenu ? <i onClick={() => {setShowMenu(!showMenu)}}
                                          style={{'zIndex': 2}} className={`fa-solid fa-bars ${ss.header_i}`}> </i> : false}
            </div>
        </>
    );
};