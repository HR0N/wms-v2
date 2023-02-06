import React from "react";
import ss from "./Time_trap_home.module.scss"
import Image from "next/dist/client/legacy/image";

import technologies from "@/public/media/images/technologies.webp"

const Time_trap_home = () => {
    return (
        <>
            <div className={ss.time_trap_home}>
                <div className={ss.title}>Запуск бізнес сайту</div>
                <div className={ss.pack}>
                    <div className={ss.col_1}>
                        <p className={ss.p1}>
                            Чи можна у наш час вести бізнес без сайту?
                            На подив, деякі компанії досі так працюють: нібито для
                            розробки не вистачає коштів чи часу. Створення
                            сайту дозволить ефективно та недорого заявити про себе!
                            Саме сайт дозволяє полегшити роботу з клієнтами та збільшити їх кількість.
                        </p>
                        <p className={ss.p2}>
                            Звісно, не кожен сайт може стати зручним інструментом для бізнесу.
                            Сучасний сайт повинен відповідати багатьом вимогам.
                            Дизайн має бути привабливим, інтуїтивно простим, адаптивним. А серверна частина
                            безпечною та масштабованою. Крім того, технології повинні бути підібрані людьми
                            з багаторічним досвідом. Такий підхід дозволяє правильно проектувати структуру сайту.
                            Підбирати технології необхідно так, щоб у майбутньому сайт можна було змінювати та додавати
                            нові розділи, функціонал та інструменти, що підвищують його ефективність.
                        </p>
                    </div>
                    <div className={ss.col_2}>
                        <Image src={technologies} alt={'img'}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Time_trap_home;