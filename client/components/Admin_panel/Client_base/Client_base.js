import React, {useEffect, useRef, useState} from "react";
import ss from "./Client_base.module.scss"
import Form_serialize from "@/sublimates/form_serialize";
import ServerClass from "@/sublimates/server";
import InputClass from "@/sublimates/input";
import Loader_2 from "@/sublimates/loader/loader_2";
import $ from 'jquery'
import Pagination from "@/components/Admin_panel/Client_base/Pagination/Pagination";

const serialize = new Form_serialize();
const server = new ServerClass();
const input = new InputClass();


const category_colors = ['transparent', 'white', 'black', 'red', 'green', 'blue'];


const submitHandler = (e, load_clients, setSearch, userCategories, refresh_fields, phone) => {
    e.preventDefault();


    let submit_type = e.nativeEvent.submitter.value;
    let data = serialize.trim_values(e);
    data.phone = data.phone.replaceAll(' ', '');
    data.categories = JSON.stringify(userCategories);



    if (submit_type === 'create') {server.store_contact_card(data, (r) => {console.log(r);}, () => {load_clients(); refresh_fields(false); phone.setValue(''); setSearch('not');});}
    else if (submit_type === 'update') {server.update_contact_card(data, data.id, (r) => {console.log(r);}, () => {load_clients();})}
    else if (submit_type === 'delete') {server.destroy_contact_card(data.id, (r) => {console.log(r);}, () => {load_clients(); setSearch('not found');})}
};






const phone_split = phone => phone.replaceAll(' ', '').replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');

const render_statuses = arr => arr.map((v, k) => <option key={k} value={v.id}>{v.category}</option>);

const render_categories = arr => arr.map((v, k) => <option key={k} value={v.id}>{v.category}</option>);


const Client_base = ({statuses, clients, categories, load_clients, filterStatuses, filterCategories}) => {

    const [update, forceUpdate] = useState(false);


    const render_user_categories = () => {
        return userCategories.map((v, k)=>{
            if(v !== 'empty' && check_user_categories_is_exist(v)){
                return <div key={k} className={`${ss.category} ${get_category_color_by_category_id(v)}`}>
                    {categories.filter(v2 => +v2.id === +v)[0].category}
                    <div className={`${ss.delete}`} onClick={e => {delete_category(v)}}
                    ><i className="fa-solid fa-circle-xmark"></i></div>
                </div>
            }
        });
    };
    const check_user_categories_is_exist = (category) => {
        return categories.filter(v => +v.id === +category).length > 0;
    };
    const get_category_color_by_category_id = (id) => {
        return ss[category_colors[categories.filter(v => +v.id === +id)[0].color]];
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

        if( Array.isArray(obj) ) obj = obj[0];

        if(obj){
            phone.setValue(obj.phone !== null ? obj.phone : '');
            name.setValue(obj.name !== null ? obj.name : '');
            occupation.setValue(obj.occupation !== null ? obj.occupation : '');
            status.setValue(obj.status !== null ? obj.status : '');
            comment.setValue(obj.comment !== null ? obj.comment : '');
            category.setValue(obj.category !== null ? obj.category : '');
            date.setValue(obj.date !== null ? obj.date : '');
            id.setValue(obj.id !== null ? obj.id : '');
            setUserCategories(JSON.parse(obj.categories))
        }else{
            name.setValue('');
            occupation.setValue('');
            status.setValue('');
            comment.setValue('');
            category.setValue('');
            date.setValue(curDate);
            id.setValue('');
            setUserCategories([]);
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


    const filterCheckCategories = (user_categories, filterArray) => {
        user_categories = JSON.parse(user_categories);
        let result = false;

        user_categories.map((v, k)=>{
            if(filterArray.includes(+v)) result = true;
        });


        return result;
    };

    const filterCheckStatus = (user_categories, filterArray) => {
        return filterArray.includes(user_categories);
    };

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(48);

    useEffect(() => {
        setLoading(true);
        if(clients !==  null) setPosts(clients);
        setLoading(false);
    }, [clients]);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts && posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = (pageNumber) => {setCurrentPage(pageNumber);};


    const render_clients = () => currentPosts.map((v, k) => {


        if(filterStatuses.length > 0 && !filterCheckStatus(v.status, filterStatuses)) return ;
        if(filterCategories.length > 0 && !filterCheckCategories(v.categories, filterCategories)) return ;


        return <div key={k}
                    className={`${ss.phone} ${ss[get_category_color_by_user(v)]}`}
                    id={v.id}
                    onClick={e => phoneSelectHandler(e)}
        >
            {phone_split(v.phone)}
        </div>
    });

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
        find_phone($(e.target).text().replaceAll(' ', ''));
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


                    <div className={`${ss.trash_card}`}
                         onClick={() => {
                             refresh_fields(false);
                             phone.setValue('');
                             setSearch('not');
                         }}
                    ><i className="fa-solid fa-trash-can"></i></div>


                    <div className={ss.title}>Контактна картка</div>


                    <form className={`${ss.form} ${ss.update}`}
                          onSubmit={e => {submitHandler(e, load_clients, setSearch, userCategories, refresh_fields, phone)}}
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
                            {/*<button className={`btn btn-outline-dark ${ss.clear}`}>Clear</button>*/}
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
                            {posts.length > 48
                            ? <Pagination
                                postsPerPage={postsPerPage}
                                totalPosts={posts && posts.length}
                                paginate={paginate}
                                currentPage={currentPage}
                                />
                            : false}

                        </div>
                    </div>
                }


            </div>
        </>
    );
};

export default Client_base;