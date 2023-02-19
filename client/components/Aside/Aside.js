import React from "react";
import ss from "./Aside.module.scss"
import Aside_item from "@/components/Aside/Aside_item";
import {useRouter} from "next/router";
import Link from "next/link";

const Aside = () => {
    const router = useRouter();

    const active = path => path.includes(router.pathname);
    const active_class = path => active(path) && ss.active;

    return (
        <>
            <div className={ss.aside}>
                <ul className={ss.list}>


                    <Aside_item cn={`${ss.item} ${active_class(['/admin_panel/client_base_page', '/admin_panel/categories_page'])}`}
                                show={active(['/admin_panel/client_base_page', '/admin_panel/categories_page'])}
                                submenu={
                              <>
                                <Link href={'/admin_panel/client_base_page'}><li className={`${ss.sub_item} ${active_class(['/admin_panel/client_base_page'])}`}>phone cards</li></Link>
                                <Link href={'/admin_panel/categories_page'}><li className={`${ss.sub_item} ${active_class(['/admin_panel/categories_page'])}`}>categories</li></Link>
                              </>
                          }
                    >
                        <div><i className="fa-solid fa-address-book"></i>Client base</div>
                    </Aside_item>


                    <Aside_item cn={`${ss.item} ${active_class('TEST')}`}>
                        <div><i className="fa-solid fa-poo"></i>Item</div>
                    </Aside_item>


                    <Aside_item cn={`${ss.item} ${active_class('TEST')}`}>
                        <div><i className="fa-solid fa-poo"></i>Item</div>
                    </Aside_item>


                    <Aside_item cn={`${ss.item} ${active_class('TEST')}`}>
                        <div><i className="fa-solid fa-poo"></i>Item</div>
                    </Aside_item>

                </ul>
            </div>
        </>
    );
};

export default Aside;