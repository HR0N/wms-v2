import React, {useEffect, useRef} from "react";
import ss from "./Technologies.module.scss"
import $ from "jquery"


const Technologies = () => {
    const row1 = useRef(null);
    const row2 = useRef(null);
    const row3 = useRef(null);

    const handleScroll =  () => {
        let distance = row2.current.getBoundingClientRect();
        // console.log(distance.y);
        if(distance.y < 800 && distance.y > 50){
            let dis = distance.y - 325;
            let screen = Math.round(window.innerWidth / 300);
            let topDis = Math.round((dis / 325) * 100 / screen);
            let extra = 20 * (4 / screen);
            $(row1.current).css({'transform': `translateX(${(-extra - 10) + topDis}%)`});
            $(row2.current).css({'transform': `translateX(${-topDis - extra}%)`});
            $(row3.current).css({'transform': `translateX(${(-extra - 5) + topDis}%)`});
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {handleScroll()});
        return window.removeEventListener('scroll', () => {handleScroll()});
    }, []);

    return (
        <>
            <div className={ss.technologies}>
                <div className={ss.wrap_4_title}>
                    <span> Technologies </span>
                </div>
                <div className={ss.tech_rows}>
                    <div className={ss.row} ref={row1} id="row1">
                        <span>HTML 5</span>
                        <span>CSS 3</span>
                        <span>Flex</span>
                        <span>Grid</span>
                        <span>Responsive</span>
                        <span>Bootstrap</span>
                        <span>JavaScript</span>
                        <span>TypeScript</span>
                        <span>Figma etc</span>
                    </div>
                    <div className={ss.row} ref={row2} id="row2">
                        <span>Prototyping</span>
                        <span>UI/UX Design</span>
                        <span>jQuery</span>
                        <span>Angular</span>
                        <span>React</span>
                        <span>NextJS</span>
                        <span>VueJS</span>
                        <span>API</span>
                    </div>
                    <div className={ss.row} ref={row3} id="row3">
                        <span>Python</span>
                        <span>PHP</span>
                        <span>SQL</span>
                        <span>Laravel</span>
                        <span>Node JS</span>
                        <span>Parsers</span>
                        <span>Telegram Bots</span>
                        <span>CRM</span>
                        <span>SEO</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Technologies;