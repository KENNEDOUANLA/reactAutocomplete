# reactAutocomplete
autocomplete input on reactjs .
AutocompleteComponent .

            EXEMPLE : 
                  
                  const data=[{label:” label1 ”, id:1,disabled:false,detail:”details”} , {label:” label2 ”, id:2}]
                  
                  const [result,setResult]=useState('');
                  
                  const option = {
                        data: data,                         //default []
                        multiple: false,                    //Optional
                        placeholder: "Select name",         //Optional
                        searchPlaceholder:'Search ...',     //Optional
                        defaultSeach:'',                    //Optional
                        defaultShow: false,                 //Optional
                        defaultSelect: 0,                   //Optional
                        instructionMessage: "mon message",  //Optional
                        norResult:"Aucune valeur trouvée"   //Optional
                   }
                   
                  <AutocompleteComponent option={option} result={setResult}/>

This component takes as props: option and result .

 *** result is the function that sets your result.
 *** option is an object with all the options and whose values are .
 
- data : an array of object [{label:” label ”, id:1,disabled:false,detail:”details”}]
   * The disabled field is  optional and it is set to false by default
   * The details field allows you to give a precision to the label. It is optional.
   
- multiple : By default is false and  optional . His values are true , false .
- defaultSelect : Allows you to select one or more default values. When the multiple value is false, it takes an integer otherwise an array of integers. These integers are the "id" of the elements of "data".
- norResult : This is the message that will be displayed when no value is found
- defaultShow : when it is true, the list of items are displayed by default .
- searchPlaceholder : the text displayed on the search input .
- placeholder : the text displayed on the input .
- You can retrieve your result with option.result
All these values are optional


Ce composant prend comme props : option et result.

  *** result est la fonction qui permet de seter votre resultat.
  *** option est un objet avec l'ensemble des options et  dont les valeurs  sont :
  
 - data : un tableau d’objet [{label:” label ”, id:1,disabled:false,detail:”details”}]
   * Le champ disabled n’est pas obligatoire et est à false par défaut
   * Le champ “details” permet de donner une précision au label . Il n’est pas obligatoire.

 - multiple : permet de faire plusieurs choix . Sa valeur par défaut est false .

 - defaultSelect : Vous permet de sélectionner une ou plusieurs valeurs par défaut. Quand la valeur multiple est à false , il prend un entier sinon un tableau entier. Ces  entiers sont les "id" des éléments de "data".

 - norResult :Il s'agit du message qui sera affiché lorsqu'aucune valeur n'est trouvée.
 - defaultShow : Lorsqu'il est vrai , la liste des items sont affichés par défaut .
 - searchPlaceholder : le texte afficher sur l’input de recherche .
 - placeholder : le texte afficher sur l’input .
 - Vous pouvez récupérer votre résultat avec option.result
 Toutes ces valeurs sont optionnelles .



