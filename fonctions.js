const already = (items,id) =>
{
    let response = false;
    items.forEach(item => {
        if (item.id === id) {
            response = true;
        }
    });
    return response;
}
export const setDefaultSelect = (defaultSelect, data,multiple=false) =>
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

export const  Selected=({ text="",id=-1,onRemove})=>{
    const Remove = (e) => {e.stopPropagation();onRemove(id);} 
    return <div className='selected_block'>
        <div className="selected_item">
            <span onClick={Remove} className="remove">X</span>
            <span className="texte">{text}</span>
        </div>
        
    </div>
}

export const  SearchItem=({ filterText, ontextChange,placeholder})=>{
    const search = (e) => ontextChange(e.target.value);
    return <div >
        <div>
            <input placeholder={placeholder} value={filterText} onChange={search} className="seach-input"/>
        </div>
    </div>
}

export const  Item=({ id, value,onAdd ,disable=false ,detail=''})=>{
    const selected = () => onAdd({ id, label:value });
    return <div onClick={disable?()=>{}:selected} className={disable?"option-disable":"option-content"} id={id}>
        <span>{value}<span className="detail">{detail}</span></span>
    </div>
}

export const  Options=({ options, filterText, onAdd, added, press = false, defaulShow,instruction,norResult})=>{
    
    let finalOption = [];
    let message = true;

    if (defaulShow && filterText.length === 0 && added.length === 0) {
        message = false;
        finalOption = options
    } else if (defaulShow && filterText.length === 0) {
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