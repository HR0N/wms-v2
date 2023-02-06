import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import ss from "./Parallax_scenery.module.scss"

// import frame_1 from "@/public/media/mn-frames/bg-frame-1-1.webp"
// import frame_2 from "@/public/media/mn-frames/bg-frame-1-2.webp"
// import frame_3 from "@/public/media/mn-frames/bg-frame-1-3.webp"
// import frame_bg from "@/public/media/mn-frames/minimal_nature.webp"
import frame_bg_m from "@/public/media/mn-frames/minimal_nature_.webp"
import frame_1_m from "/public/media/mn-frames/bg-frame-1-1-min.webp"
import frame_2_m from "@/public/media/mn-frames/bg-frame-1-2-min.webp"
import frame_3_m from "@/public/media/mn-frames/bg-frame-1-3-min.webp"

const isMobile = () => window.matchMedia('only screen and (max-width: 768px)').matches;

const addEventListener = () => {
    window.addEventListener('scroll', e => {
        if(window.scrollY < 800){
            document.body.style.cssText = `--scrollTop: -${window.scrollY ? window.scrollY : 0}px`;
        }
    });
};


const Parallax_scenery = () => {
    let frame_1_pc = null,
        frame_2_pc = null,
        frame_3_pc = null,
        frame_bg_pc = null;

    const [mobile, setMobile] = useState(null);

    const load_pc_images = () => {
        import("@/public/media/mn-frames/bg-frame-1-1.webp").then((res) => {frame_1_pc = res.default});
        import("@/public/media/mn-frames/bg-frame-1-2.webp").then((res) => {frame_2_pc = res.default});
        import("@/public/media/mn-frames/bg-frame-1-3.webp").then((res) => {frame_3_pc = res.default});
        import("@/public/media/mn-frames/minimal_nature.webp").then((res) => {frame_bg_pc = res.default});
    };

    const transition = useRef(null);

    useEffect(() => {
        addEventListener();

        if(!isMobile()){
            load_pc_images();
            setMobile(isMobile());
        }
    },[]);


    return (
        <>
            <div className={ss.parallax_scenery}>
                <div className={ss.image_pack}>
                    <Image src={mobile ? frame_1_pc : frame_1_m} alt={'image'}/>
                    <Image src={mobile ? frame_2_pc : frame_2_m} alt={'image'}/>
                    <Image src={mobile ? frame_3_pc : frame_3_m} alt={'image'}/>
                    <Image src={mobile ? frame_bg_pc : frame_bg_m} alt={'image'}/>
                    <div ref={transition} className={ss.after}> </div>
                </div>
            </div>
        </>
    );
};

export default Parallax_scenery;