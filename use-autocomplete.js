import { SearchItem, Options, Selected,setDefaultSelect } from './fonctions';
import { useState ,useEffect} from 'react';
import './index.css';

function Autocomplete({option={},result=()=>{}})
{
    const { data = [], defaultSeach = '', searchPlaceholder = "Search...", multiple = false, placeholder = "Select name",
        defaulShow = false, defaultSelect = false,instructionMessage="Enter one or more characters",norResult="no results found"} = option;
    
    
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

    return <div className="autocomplite" onMouseLeave={hide}>
        <div className={press?"selected_values_open":"selected_values"} onClick={show}>
            {added==='' || added.length===0 ? placeholder:""}
            {multiple && <div className="selected_items">
            {added.map((element, index) => <Selected key={index} text={element.label}
                id={element.id} onRemove={remove} />)}
            </div>}
            {!multiple && added!=='' && added.label}
        </div>
        <div className={press?"seach_block":'hide'} >
        <SearchItem filterText={filterText}
            ontextChange={changeTexte} placeholder={searchPlaceholder}/>
        <Options filterText={filterText} options={data}
                added={added} onAdd={add} onRemove={remove} press={press} defaulShow={defaulShow}
                instruction={instructionMessage} norResult={norResult}/>
        </div>
    </div>
}

export default Autocomplete;