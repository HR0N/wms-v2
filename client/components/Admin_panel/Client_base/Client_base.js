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


const category_colors = ['transparent', 'white', 'black', 'red', 'green', 'blue'];


const submitHandler = (e, load_clients, setSearch, userCategories) => {
    e.preventDefault();


    let submit_type = e.nativeEvent.submitter.value;
    let data = serialize.trim_values(e);
    data.phone = data.phone.replaceAll(' ', '');
    data.categories = JSON.stringify(userCategories);
    let id = null;

    console.log(data);

    if (submit_type === 'create') {server.store_contact_card(data, (r) => {console.log(r);}, () => {load_clients(); setSearch('found');});}
    else if (submit_type === 'update') {server.update_contact_card(data, id, () => {}, () => {load_clients();})}
    else if (submit_type === 'delete') {server.destroy_contact_card(id, () => {}, () => {load_clients();})}
};






const phone_split = phone => phone.replaceAll(' ', '').replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');

const render_statuses = arr => arr.map((v, k) => <option key={k} value={v.id}>{v.category}</option>);

const render_categories = arr => arr.map((v, k) => <option key={k} value={v.id}>{v.category}</option>);


// let user_categories = ['cat 1', 'cat 10', 'kabanchik parse', 'empty cojones'];



const Client_base = ({statuses, clients, categories, load_clients}) => {

    const [update, forceUpdate] = useState(false);


    const render_user_categories = () => {
        return userCategories.map((v, k)=>{
            if(v !== 'empty'){
                return <div key={k} className={`${ss.category}`}>
                    {categories.filter(v2 => +v2.id === +v)[0].category}<div className={`${ss.delete}`} onClick={e => {delete_category(v)}}><i className="fa-solid fa-circle-xmark"></i></div>
                </div>
            }
        });
    };
    const delete_category = id => {
        // let parent = $(e.currentTarget).parent();
        // let text = parent.text();
        setUserCategories(userCategories.filter(cat => cat !== id));
        // $(parent).remove();
        forceUpdate(!update);
    };

    const [userCategories, setUserCategories] = useState(['empty']);
    const [search, setSearch] = useState('not');

    const phone = input.init('');
    const name = input.init('');
    const occupation = input.init('');
    const status = input.init('');
    const comment = input.init('');
    const category = input.init('');
    let curDate = new Date();
    curDate = `${curDate.getFullYear()}-${(curDate.getMonth() + 1).toString().length < 2 ? '0'+(curDate.getMonth() + 1).toString() : curDate.getMonth() + 1}-${curDate.getDate().toString().length < 2 ? '0'+curDate.getDate().toString() : curDate.getDate()}`;
    const date = input.init(curDate);
    const id = input.init('');

    const phones_filter = phone => clients.filter(v => v.phone === phone.replaceAll(' ', ''));

    const refresh_fields = obj => {
        if(obj.hasOwnProperty('name')){
            phone.setValue(obj.phone);
            name.setValue(obj.name);
            occupation.setValue(obj.occupation);
            status.setValue(obj.status);
            comment.setValue(obj.comment);
            category.setValue(obj.category);
            date.setValue(obj.date);
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
        if(!clients) return;
        phone = phone.replaceAll(' ', '');
        let contact_card = phones_filter(phone);

        if(phone.length > 0 && phone.length < 10 && contact_card.length === 0){setSearch('yes');}
        else if(phone.length === 10 && contact_card.length > 0){setSearch('found');}
        else if(phone.length === 10 && contact_card.length === 0){setSearch('not found'); date.setValue(curDate);}
        else{setSearch('not');}

        refresh_fields(contact_card);
    };


    const render_clients = () => clients.map((v, k) => <div key={k} className={`${ss.phone} ${ss[get_category_color_by_user(v)]}`} id={v.id} onClick={e => phoneSelectHandler(e)}>{phone_split(v.phone)}</div>);

    const user_last_category = user => JSON.parse(user.categories).slice(-1);
    const get_category_color_by_user = user => {
        if(!categories) return;
        let category = categories.filter((v, k) => v.id === +user_last_category(user))[0];
        if(category){return category_colors[category.color];}
        else return 'transparent';

    };


    const add_category_to_user = (e) => {
        let new_value = $(e.target).val();
        if(new_value === 'empty') return;
        if(userCategories.indexOf(new_value) < 0){
            let arr = [new_value].concat(userCategories);
            setUserCategories(arr);
        }
        if(userCategories.length === 1 && userCategories.indexOf('empty') > -1){
            setUserCategories([new_value]);
        }
    };


    const phoneSelectHandler = (e) => {
        clients.map((v, k) => {
            if(+v.id === +$(e.target).attr('id')){
                setUserCategories(JSON.parse(v.categories));
                refresh_fields(v);
            }});
    };

    useEffect(() => {

    }, []);


    return (
        <>
            <div className={ss.client_base}>


                <div className={`${ss.crud}`}>
                    <div className={ss.title}>Контактна картка</div>
                    <form className={`${ss.form} ${ss.update}`}
                          onSubmit={e => {submitHandler(e, load_clients, setSearch, userCategories)}}
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
                                   placeholder={`Поширення демократії`}
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
                            (userCategories.length > 0 && userCategories[0] !== 'empty') &&
                            <div className={`${ss.categories}`}>
                                {render_user_categories()}
                            </div>
                        }

                        <label>Присвоєння категорій
                            <select className={`form-control`} name="category"
                                    value={category.val}
                                    onChange={e => {category.onChange(e); add_category_to_user(e);}}
                            >
                                <option value={`empty`}> </option>
                                {categories && render_categories(categories)}
                            </select>
                        </label>


                        <label>Остання взаємодія
                            <input type="date"
                                   className={`form-control`}
                                   name={`date`}
                                   value={date.val}
                                   onChange={e => {date.onChange(e);}}
                            />
                        </label>


                        <input type="text" name={'id'} hidden={true}
                               value={id.val}
                               onChange={e => {id.onChange(e);}}
                        />


                        <div className={ss.buttons}>
                            <button type={`submit`} className={`btn btn-outline-dark`} value={`create`}>Create</button>
                            <button type={`submit`} className={`btn btn-outline-dark`} value={`update`}>Update</button>
                            <button type={`submit`} className={`btn btn-outline-dark`} value={`delete`}>Delete</button>
                        </div>


                    </form>
                </div>


                {
                    clients && <div className={`${ss.crud}`}>
                        <div className={ss.title}>База номерів</div>
                        <div className={`${ss.phones}`}>
                            {/*<div className={`${ss.phone}`}>063 605 66 49</div>*/}
                            {render_clients()}
                            {/*<div className={`${ss.phone}`} id={11} onClick={e => phoneSelectHandler(e)}>{`v.phone`}</div>*/}
                        </div>
                    </div>
                }


            </div>
        </>
    );
};

export default Client_base;