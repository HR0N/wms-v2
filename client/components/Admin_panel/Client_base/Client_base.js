import React, {useEffect, useRef, useState} from "react";
import ss from "./Client_base.module.scss"
import Form_serialize from "@/sublimates/form_serialize";
import ServerClass from "@/sublimates/server";
import InputClass from "@/sublimates/input";
import Loader_2 from "@/sublimates/loader/loader_2";
import $ from 'jquery'

const serialize = new Form_serialize();
const server = new ServerClass();
const input = new InputClass();


const submitHandler = e => {
    e.preventDefault();


    let submit_type = e.nativeEvent.submitter.value;
    let data = serialize.trim_values(e);
    data.phone.replace(' ', '');
    let id = null;

    if (submit_type === 'create') {server.store_contact_card(data);}
    else if (submit_type === 'update') {server.update_contact_card(data, id)}
    else if (submit_type === 'delete') {server.destroy_contact_card(id)}
};

const phone_split = phone => phone.replaceAll(' ', '').replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');

const render_statuses = obj => Object.keys(obj).map((v, k) => <option key={k} value={v}>{obj[v]}</option>);


let categories = ['cat 1', 'cat 10', 'kabanchik parse', 'empty cojones'];



const Client_base = ({statuses}) => {

    const [update, forceUpdate] = useState(false);


    const render_user_categories = () => {
        return categories.map((v, k)=>{
            return <div key={k} className={`${ss.category}`}>
                {v}<div className={`${ss.delete}`} onClick={e => {delete_category(e)}}><i className="fa-solid fa-circle-xmark"></i></div>
            </div>
        });
    };
    const delete_category = e => {
        let parent = $(e.currentTarget).parent();
        let text = parent.text();
        categories = categories.filter(cat => cat !== text);
        console.log(categories);
        // $(parent).remove();
        forceUpdate(!update);
    };

    const [data, setData] = useState([
        {
            id: '0',
            phone: '0636056649',
            name: 'Kovalenko Evben',
            occupation: 'programming',
            status: 'work',
            comment: 'Work with next, laravel',
            category: 'category',
            date: '2023-02-14',
        }
        ]);
    const [search, setSearch] = useState('not');

    const phone = input.init('');
    const name = input.init('');
    const occupation = input.init('');
    const status = input.init('');
    const comment = input.init('');
    const category = input.init('');
    const date = input.init('');

    const phones_filter = phone => data.filter(v => v.phone === phone.replaceAll(' ', ''));

    const refresh_fields = obj => {
        if(obj.length > 0){
            name.setValue(obj[0].name);
            occupation.setValue(obj[0].occupation);
            status.setValue(obj[0].status);
            comment.setValue(obj[0].comment);
            category.setValue(obj[0].category);
            date.setValue(obj[0].date);
        }else{
            name.setValue('');
            occupation.setValue('');
            status.setValue('');
            comment.setValue('');
            category.setValue('');
            date.setValue('');
        }
    };

    const find_phone = phone => {
        phone = phone.replaceAll(' ', '');
        let contact_card = phones_filter(phone);

        if(phone.length > 0 && phone.length < 10 && contact_card.length === 0){setSearch('yes');}
        else if(phone.length === 10 && contact_card.length > 0){setSearch('found');}
        else if(phone.length === 10 && contact_card.length === 0){setSearch('not found');}
        else{setSearch('not');}


        refresh_fields(contact_card);
    };


    useEffect(() => {
        // server.get_contact_cards(() => {}, (res) => {setData(res)});
    }, []);


    return (
        <>
            <div className={ss.client_base}>


                <div className={`${ss.crud}`}>
                    <div className={ss.title}>Контактна картка</div>
                    <form className={`${ss.form} ${ss.update}`}
                          onSubmit={e => {submitHandler(e)}}
                    >


                        <label>Телефон
                            <input type="tel" className={`form-control`} name={`phone`} placeholder={`050 825 50 25`}
                                   value={phone_split(phone.val)}
                                   onChange={e => {phone.onChange(e); find_phone(e.target.value)}}
                            />
                            {search === 'yes' && <div className={`${ss.loader}`}><Loader_2 color={`black`}/></div>}
                            {search === 'found' && <div className={`${ss.success}`}><i className="fa-regular fa-square-check"></i></div>}
                            {search === 'not found' && <div className={`${ss.fail}`}><i className="fa-regular fa-rectangle-xmark"></i></div>}
                        </label>


                        <label>ПІБ
                            <input type="text" className={`form-control`} name={`name`} placeholder={`Бандера Степан`}
                                   value={name.val}
                                   onChange={e => {name.onChange(e);}}
                            />
                        </label>


                        <label>Рід діяльності
                            <input type="text" className={`form-control`} name={`occupation`}
                                   placeholder={`Різанина свинособак`}
                                   value={occupation.val}
                                   onChange={e => {occupation.onChange(e);}}
                            />
                        </label>


                        <label>Статус співпраці
                            <select className={`form-control`} name="status"
                                    value={status.val}
                                    onChange={e => {status.onChange(e);}}
                            >
                                {statuses && render_statuses(statuses)}
                                {/*<option value="none">Ніякого</option>
                                <option value="work">Працюємо</option>
                                <option value="worked_well_before">Працювали раніше, добре</option>
                                <option value="worked_before_bad">Працювали раніше, погано</option>
                                <option value="potential_client">Потенційний клієнт</option>
                                <option value="inadequate">Неадекватний</option>*/}
                            </select>
                        </label>


                        <label className={`${ss.comment}`}>Коментар
                            <textarea className={`form-control`} name="comment"
                                      placeholder={`Будь-яка інформація потенційно корисна в майбутньому.`}
                                      value={comment.val}
                                      onChange={e => {comment.onChange(e);}}
                            />
                        </label>


                        {
                            categories.length > 0 &&
                            <div className={`${ss.categories}`}>
                                {render_user_categories(categories)}
                            </div>
                        }

                        <label>Присвоєння категорій
                            <input type="text" className={`form-control`} name={`category`}
                                   value={category.val}
                                   onChange={e => {category.onChange(e);}}
                            />
                        </label>


                        <label>Остання взаємодія
                            <input type="date"
                                   className={`form-control`}
                                   name={`date`}
                                   value={date.val}
                                   onChange={e => {date.onChange(e);}}
                            />
                        </label>


                        <div className={ss.buttons}>
                            <button type={`submit`} className={`btn btn-outline-dark`} value={`create`}>Create</button>
                            <button type={`submit`} className={`btn btn-outline-dark`} value={`update`}>Update</button>
                            <button type={`submit`} className={`btn btn-outline-dark`} value={`delete`}>Delete</button>
                        </div>


                    </form>
                </div>


               {/* <div className={`${ss.crud}`}>
                    <div className={ss.title}>Create</div>
                </div>*/}


                {/*<div className={`${ss.crud}`}>
                    <div className={ss.title}>Create</div>
                    <form className={`${ss.form} ${ss.create}`}>


                        <label>Телефон
                            <input type="tel" className={`form-control`} name={`phone`} placeholder={`050 825 50 25`}/>
                        </label>


                        <div className={ss.buttons}>
                            <button type={`submit`} className={`btn btn-outline-dark`}>Add</button>
                        </div>


                    </form>
                </div>*/}


            </div>
        </>
    );
};

export default Client_base;