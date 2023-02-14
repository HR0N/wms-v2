import React from "react";
import ss from "./Categories.module.scss"
import Form_serialize from "@/sublimates/form_serialize";
import ServerClass from "@/sublimates/server";
import InputClass from "@/sublimates/input";
import Loader_2 from "@/sublimates/loader/loader_2";

const serialize = new Form_serialize();
const server = new ServerClass();
const input = new InputClass();

const render_categories = obj => Object.keys(obj).map((v, k) => <option key={k} value={v}>{obj[v]}</option>);

const Categories = ({categories}) => {

    const new_category = input.init('');
    const existing_category = input.init('');


    return (
        <>
            <div className={ss.categories}>

                <div className={`${ss.create_category}`}>
                    <form className={`${ss.form}`}>

                        <label>Створити категорію
                            <input type="text" className={`form-control`} name={`new_category`} placeholder={`Хворі на рак яєчок`}
                                value={new_category.val}
                                onChange={e => {new_category.onChange(e)}}
                            />
                        </label>


                        <div className={`${ss.buttons}`}>
                            <button type={`submit`} className="btn btn-outline-dark">Create</button>
                        </div>

                    </form>
                </div>


                <div className={`${ss.delete_category}`}>
                    <form className={`${ss.form}`}>

                        <label>Видалення існуючих категорій
                            <select className={`form-control`} name="existing_category"
                                value={existing_category.val}
                                onChange={e => {existing_category.onChange(e)}}
                            >
                                <option value="empty"> - - - - - - - - </option>
                                {categories && render_categories(categories)}
                                {/*<option value="none">Ніякого</option>
                                <option value="work">Працюємо</option>
                                <option value="worked_well_before">Працювали раніше, добре</option>
                                <option value="worked_before_bad">Працювали раніше, погано</option>
                                <option value="potential_client">Потенційний клієнт</option>
                                <option value="inadequate">Неадекватний</option>*/}
                            </select>
                        </label>


                        <div className={`${ss.buttons}`}>
                            <button type={`submit`} className="btn btn-outline-dark">Delete</button>
                        </div>

                    </form>
                </div>

            </div>
        </>
    );
};

export default Categories;