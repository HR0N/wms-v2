import React from "react";
import ss from "./Choose_site_type.module.scss"



const Choose_site_type = () => {

    return (
        <>
            <div className={ss.choose_site_type}>
                <div className={ss.choose_title}>Виберіть тип сайту</div>
                <div className={ss.cards}>


                    <div className={ss.card}>
                        <div className={ss.card__title}>Сайт-візитка</div>
                        <div className={ss.card__icon}><i className="fa-regular fa-paste"></i></div>
                        <div className={ss.card__description}>
                            <div className={ss.card__description_t1}>1-3 дня</div>
                            <div className={ss.card__description_t2}>одна сторінка</div>
                        </div>
                        <div className={ss.card__price}>500 грн</div>
                        <div className={ss.card__buttons}><div className="button btn btn-outline-dark">Детальніше</div></div>
                    </div>

                    <div className={ss.card}>
                        <div className={ss.card__title}>Лендінг пейдж</div>
                        <div className={ss.card__icon}><i className="fa-solid fa-rocket"></i></div>
                        <div className={ss.card__description}>
                            <div className={ss.card__description_t1}>3-5 дня</div>
                            <div className={ss.card__description_t2}>одна сторінка</div>
                        </div>
                        <div className={ss.card__price}>2000 грн</div>
                        <div className={ss.card__buttons}><div className="button btn btn-outline-dark">Детальніше</div></div>
                    </div>

                    <div className={ss.card}>
                        <div className={ss.card__title}>Сайт-бізнес</div>
                        <div className={ss.card__icon}><i className="fa-solid fa-handshake"></i></div>
                        <div className={ss.card__description}>
                            <div className={ss.card__description_t1}>від 5 днів</div>
                            <div className={ss.card__description_t2}>багатосторінковий сайт</div>
                        </div>
                        <div className={ss.card__price}><em>від </em>3500 грн</div>
                        <div className={ss.card__buttons}><div className="button btn btn-outline-dark">Детальніше</div></div>
                    </div>
                    <div className={ss.card}>
                        <div className={ss.card__title}>Інтернет магазин</div>
                        <div className={ss.card__icon}><i className="fa-solid fa-cart-shopping"></i></div>
                        <div className={ss.card__description}>
                            <div className={ss.card__description_t1}>від 7 днів</div>
                            <div className={ss.card__description_t2}>кошик, оплата, доставка</div>
                        </div>
                        <div className={ss.card__price}><em>від </em>4500 грн</div>
                        <div className={ss.card__buttons}><div className="button btn btn-outline-dark">Детальніше</div></div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Choose_site_type;