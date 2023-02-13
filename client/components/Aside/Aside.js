import React from "react";
import ss from "./Aside.module.scss"
import Item from "@/components/Aside/item";
import {useRouter} from "next/router";
import Link from "next/link";

const Aside = () => {
    const router = useRouter();

    const active = path => router.asPath.split('/').includes(path);
    const active_class = path => active(path) && ss.active;

    return (
        <>
            <div className={ss.aside}>
                <ul className={ss.list}>


                    <Item cn={`${ss.item} ${active_class('client_base_page')}`}
                          show={active('client_base_page')}
                          submenu={
                              <>
                                <Link href={'admin_panel/client_base_page'}><li className={`${ss.sub_item} ${active_class('client_base_page')}`}>crud</li></Link>
                                <Link href={'admin_panel/categories'}><li className={`${ss.sub_item} ${active_class('categories')}`}>Categories</li></Link>
                              </>
                          }
                    >
                        <div><i className="fa-solid fa-address-book"></i>Client base</div>
                    </Item>


                    <Item cn={`${ss.item} ${active_class('TEST')}`}>
                        <div><i className="fa-solid fa-poo"></i>Item</div>
                    </Item>


                    <Item  cn={`${ss.item} ${active_class('TEST')}`}>
                        <div><i className="fa-solid fa-poo"></i>Item</div>
                    </Item>


                    <Item  cn={`${ss.item} ${active_class('TEST')}`}>
                        <div><i className="fa-solid fa-poo"></i>Item</div>
                    </Item>

                </ul>
            </div>
        </>
    );
};

export default Aside;