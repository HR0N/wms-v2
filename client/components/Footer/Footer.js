import React from "react";
import ss from "./Footer.module.scss"
import Image from "next/dist/client/legacy/image";

export const Footer = ()=>{
    return  (
        <>
            <div className={ss.footer}>
                <div className={ss.pack}>

                    <div className={ss.col}>
                        <div className={ss.title}>Розробка сайтів</div>
                        <a className={ss.link}>Сайт візитка</a>
                        <a className={ss.link}>Лендінг пейдж</a>
                        <a className={ss.link}>Сайт Бізнес</a>
                        <a className={ss.link}>Інтернет магазин</a>
                        <a className={ss.link}>Ексклюзивні сайти</a>
                    </div>
                    <div className={ss.col}>
                        <div className={ss.title}>Дизайн</div>
                        <a className={ss.link}>Готові дизайни сайтів</a>
                        <a className={ss.link}>Готові логотипи</a>
                    </div>
                    <div className={ss.col}>
                        <div className={ss.title}>Сервіси</div>
                        <a className={ss.link}>Онлайн консультант</a>
                        <a className={ss.link}>Емайл-розсилки</a>
                        <a className={ss.link}>Контекстна реклама</a>
                        <a className={ss.link}>Конструктор сайтів</a>
                        <a className={ss.link}>Автоматизація бізнесу</a>
                    </div>
                    <div className={ss.col}>
                        <div className={ss.title}>SEO</div>
                        <a className={ss.link}>Оптимізація сайту</a>
                        <a className={ss.link}>Просування сайту</a>
                        <a className={ss.link}>Контекстна реклама</a>
                    </div>
                    <div className={ss.col}>
                        <div className={ss.title}>Підтримка</div>
                        <a className={ss.link}>Посібник користувача</a>
                        <a className={ss.link}>Навчальне розсилання</a>
                    </div>
                    <div className={ss.col}>
                        <div className={ss.title_phone}>ТЕЛЕФОН</div>
                        <div className={ss.phone}>+38(063) 605 66 49</div>
                        <div className={ss.socials}>
                            <a className={ss.telegram}><i className="fa-brands fa-telegram"></i></a>
                            <a className={ss.instagram}><i className="fa-brands fa-instagram"></i></a>
                            <a className={ss.youtube}><i className="fa-brands fa-youtube"></i></a>
                        </div>
                        <div className={ss.address}>Украина, Киев</div>
                    </div>

                </div>
            </div>
        </>
    );
};