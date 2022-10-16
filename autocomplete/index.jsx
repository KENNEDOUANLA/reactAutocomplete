import React ,{ useState, useEffect } from 'react';
import './index.css'

const already = (items, id) =>
{
    let response = false;
    items.forEach(item => {
        if (item.id === id) {
            response = true;
        }
    });
    return response;
}



const  Item=({ id, value,onAdd ,disable=false ,detail=''})=>{
    const selected = () => onAdd({ id, label:value });
    return (<div onClick={disable?()=>{}:selected} className={disable?"option-disable":"option-content"} id={id}>
        <span>{value}<span className="detail">{detail}</span></span>
    </div>)
}

const setDefaultSelect = (defaultSelect, data, multiple = false) =>
{
    if (multiple && Array.isArray(defaultSelect))
        return data.filter(element => defaultSelect.includes(element.id));
    else if(multiple)
        return [];
    else {
        const selected = data.filter(element => defaultSelect === element.id);
        return selected.length > 0 ?selected[0]:'';
    }
}

const  Selected=({ text="",id=-1,onRemove=()=>{}})=>{
    const Remove = (e) => {e.stopPropagation();onRemove(id);} 
    return (<div className='selected_block'>
        <div className="selected_item">
            <span onClick={Remove} className="remove">X</span>
            <span className="texte">{text}</span>
        </div>
    </div>)
}

const  SearchItem=({ filterText, ontextChange,placeholder})=>{
    const search = (e) => ontextChange(e.target.value);
    return (<div >
        <div>
            <input placeholder={placeholder} value={filterText} onChange={search} className="seach-input"/>
        </div>
    </div>)
}



const  Options=({ options, filterText, onAdd, added, press = false, defaultShow,instruction,norResult})=>{
    
    let finalOption = [];
    let message = true;

    if (defaultShow && filterText.length === 0 && added.length === 0) {
        message = false;
        finalOption = options
    } else if (defaultShow && filterText.length === 0) {
        message = false;
        finalOption = options.filter(option =>
        {
            if (Array.isArray(added) && already(added, option.id))
                return false;
            return true;
        });

    }else if(filterText.length > 0){
        message = false;
        finalOption = options.filter(option =>{
            if (Array.isArray(added) && added.length > 0 && already(added, option.id))
                return false;
            
            if (option.label.toLowerCase().search(filterText.toLowerCase().trim()) === 0)
                return true;

            return false
        });
    }

    const nor_result = filterText.length > 0 && finalOption.length === 0 ? true : false;
    const show_data = !message || !nor_result;

    return <div className={press || filterText.length>0 ?"items-block":"hide"} >
        {show_data && finalOption.map((item, index) => <Item key={index} id={item.id} value={item.label} onAdd={onAdd} disable={item.disabled} detail={item.detail}/>)}
        {nor_result && <span>{norResult}</span>}
        {message && <span>{instruction}</span> }
    </div>
}

const Autocomplete = ({option={},result=()=>{}}) =>
{
    const { data = [], defaultSeach = '', searchPlaceholder = "Search...", multiple = false, placeholder = "Select name",
        defaultShow = false, defaultSelect = false,instructionMessage="Enter one or more characters",norResult="no results found"} = option;
    
    
    const [filterText, setFilterText] = useState(defaultSeach)
    const [added, setAdded] = useState(setDefaultSelect(defaultSelect, data, multiple));
    const [press, setPress] = useState(false);

    const changeTexte = (text) => setFilterText(text);
    const response = (sortie) => result(sortie);
    useEffect(() => { response(added);},[]);



    const add = (element) =>
    {
        if (multiple) {
            setAdded([...added, element]);
            response([...added, element]);
        } else {
            setAdded(element);
            setFilterText('');
            setPress(false);
            response(element);
        }
    };

    const remove = (id) =>
    {
        const new_array = added.filter(element => element.id !== id);
        response(new_array);
        setAdded(new_array);
    };

    const show = () => setPress(!press);
    const hide = () => setPress(false);

    return (<div className="autocomplite" onMouseLeave={hide}>
        <div className={press?"selected_values_open":"selected_values"} onClick={show}>
            {added==='' || added.length===0 ? placeholder:""}
            {multiple && <div className="selected_items">
            {added.map((element, index) => <Selected key={index} text={element.label}
                id={element.id} onRemove={remove} />)}
            </div>}
            {!multiple && added !== '' && added.label}
            <div className='icon'>
                {press ?<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                </svg>:<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>}
            </div>
        </div>
        
        <div className={press ? "seach_block" : 'hide'} >
        
        <SearchItem filterText={filterText}
            ontextChange={changeTexte} placeholder={searchPlaceholder}/>
        <Options filterText={filterText} options={data}
                added={added} onAdd={add} onRemove={remove} press={press} defaultShow={defaultShow}
                instruction={instructionMessage} norResult={norResult}/>
        </div>
    </div>)
}

export default Autocomplete;