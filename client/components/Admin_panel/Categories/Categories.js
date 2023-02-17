import React, {useEffect, useRef, useState} from "react";
import ss from "./Categories.module.scss"
import Form_serialize from "@/sublimates/form_serialize";
import ServerClass from "@/sublimates/server";
import InputClass from "@/sublimates/input";
import Loader_2 from "@/sublimates/loader/loader_2";

const serialize = new Form_serialize();
const server = new ServerClass();
const input = new InputClass();

const submitHandler = (e, color, load_data, new_category) => {
    e.preventDefault();
    let data = serialize.trim_values(e);
    data.color = color;
    server.store_client_base_category(data, (err) => {}, () => {load_data(); new_category.setValue('')});
};

const deleteHandler = (e, load_data) => {
    e.preventDefault();
    let data = serialize.trim_values(e).id;
    server.destroy_client_base_category(data, (err) => {console.log(err);}, () => {load_data()});
};

const render_categories = arr => arr.map((v, k) => <option key={k} value={v.id}>{v.category}</option>);

const Categories = ({categories, load_data}) => {

    const [update, forceUpdate] = useState(false);
    const [color, setColor] = useState(0);
    const colorsRef = useRef(null);
    const new_category = input.init('');
    const existing_category = input.init('');

    useEffect(() => {forceUpdate(!update)}, [categories]);


    return (
        <>
            <div className={ss.categories}>

                <div className={`${ss.create_category}`}>
                    <form className={`${ss.form}`} onSubmit={e => submitHandler(e, color, load_data, new_category)}>

                        <label>Створити категорію
                            <input type="text" className={`form-control`} name={`category`} placeholder={`Чудовий покупець`}
                                value={new_category.val}
                                onChange={e => {new_category.onChange(e)}}
                            />
                        </label>

                        <label>Оберіть колір для категорії
                            <div className={`${ss.colors}`} ref={colorsRef}>
                                <div style={{'marginTop': '10px'}} className={`${ss.color} ${ss.transparent} ${color === 0 && ss.color_active}`} onClick={() => {setColor(0)}}> </div>
                                <div style={{'marginTop': '10px'}} className={`${ss.color} ${ss.white} ${color === 1 && ss.color_active}`} onClick={() => {setColor(1)}}> </div>
                                <div style={{'marginTop': '10px'}} className={`${ss.color} ${ss.black} ${color === 2 && ss.color_active}`} onClick={() => {setColor(2)}}> </div>
                                <div style={{'marginTop': '10px'}} className={`${ss.color} ${ss.red} ${color === 3 && ss.color_active}`} onClick={() => {setColor(3)}}> </div>
                                <div style={{'marginTop': '10px'}} className={`${ss.color} ${ss.green} ${color === 4 && ss.color_active}`} onClick={() => {setColor(4)}}> </div>
                                <div style={{'marginTop': '10px'}} className={`${ss.color} ${ss.blue} ${color === 5 && ss.color_active}`} onClick={() => {setColor(5)}}> </div>
                            </div>
                        </label>


                        <div className={`${ss.buttons}`}>
                            <button type={`submit`} className="btn btn-outline-dark">Створити</button>
                        </div>

                    </form>
                </div>


                <div className={`${ss.delete_category}`}>
                    <form className={`${ss.form}`} onSubmit={e => {deleteHandler(e, load_data)}}>

                        <label>Видалення існуючих категорій
                            <select className={`form-control`} name="id"
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
                            <button type={`submit`} className="btn btn-outline-dark">Видалити</button>
                        </div>

                    </form>
                </div>

            </div>
        </>
    );
};

export default Categories;