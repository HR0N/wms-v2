import React from "react";
import ss from "./Aside_links.module.scss"


const Aside_links = () => {
    return (
        <>
            <div className={ss.aside_links}>
                <ul>
                    <li><a target={'_blank'} href="https://sinoptik.ua/%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0-%D0%BA%D0%B8%D0%B5%D0%B2/10-%D0%B4%D0%BD%D0%B5%D0%B9">Погода</a></li>
                    <li><a target={'_blank'} href="https://index.minfin.com.ua/markets/fuel/reg/kievskaya/#idx-contentbanner2">Топливо</a></li>
                    <li><a target={'_blank'} href="https://minfin.com.ua/currency/">Валюта</a></li>
                </ul>
            </div>
        </>
    );
};

export default Aside_links;