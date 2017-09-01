# Redux
"*Redux is a predictable state container for JavaScript apps.*" ([Redux](http://redux.js.org/)).
Redux busca mantener toda la información necesaria en un estado unico, basandose en la ídea de que un estado tiene una única vista.

Las siguientes notas fueron tomadas del tutorial [Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux) de egghead.io

## Store
Es el objeto que contiene el estado actuál de la página.
Para su creación basta con hacer:
```js
const { createStore } = Redux;
// import { createStore } from 'redux';
const store = createStore(REDUCER);
```
Tiene tres principales funciones asociadas a los principios.
- **dispatch(*action*)**: Ejecuta una acción.
- **getState()**: Obtiene el objeto estado actual.
- **subscribe(*function*)**:  función que ejecutará cada vez que se actualice el estado con una acción.

## Notas importantes
- Hay un único árbol de estados
- Cada cambio de estado es producido por una acción
- **Reducer**: Recibe como entrada un estado y una acción. Retorna un nuevo estado. Es importante notar que se CREA un nuevo estado, NO se modifica (función pura). Un reducer tipico se ve:
     ```js
     function counter(state=0, action){
          switch(action.type){
               case "INCREMENT_COUNTER":
                    return state+1;
               case "DECREMENT_COUNTER":
                    return state-1;
               default:
                    return state
          }
     }
     ```
- **Store**: Objeto que contendrá el estado actual.
-  Para evitar modificar los array entregado se puede hacer: 
     ```js
        // concat
        let newList = [...list, data]
        // Eliminar index
        let newList = [...list.splice(0,index), 
                       ...list.splice(index+1)]
    ```
- Para evitar modificar los objetos usamos:
    ```js
    // ES6
    let newObject = Object.assign({}, object, {
                                    prop1: val1, 
                                    prop2: val2
                                    })
    // ES7
    let newObject = {...object,  {
                                    prop1: val1, 
                                    prop2: val2
                                    }}
    ```
- Para no usar un unico gran *reducer*, lo que haremos es componerlos con **combineReducers**. En este caso, llama a cada reducer con el estado de nombre *state.reducer*
    ```js
    const { combineReducers } = Redux;
    const app = combineReducers({ reducer1, reducer2, reducer3 })
    ```
- **Presentational Component**: Componente usado solo como visualización. Idealmente no le pondrémos funciones *hardcoded*, ingresaremos sus funciones como parametros. No es obligatorio, pero es muy recomendado como buena práctica.
- **Container Component**: Se preocupa del resto, entregando las *props* pertinentes para que los *presentational component* entreguen la vista indicada. Cada uno de estos componentes se subscribe a la *store*
- Usarmos container components cuando tengamos componentes que lo único que hacen es entregar *props*. Al usarlos, reduciremos la complejidad y ordenaremos el código.
- No es conveniente usar la *store* como variable global.
- **Provider**: Es un componente creado, cuya unica función es entregarle información a sus hijos. Esto lo harémos con la función *getChildContext*. El provider esta entregado por *react-redux*, pero para entenderlo mejor se ve así:
    ```js
    class Provider extends Component{
        getChildContext(){
            return(){
                store: this.props.store
            };
        }
        render(){
            return this.props.children
        }
    }
    
    // Los siguientes sirven para poder pasar el contexto hacia abajo en el árbol
    // Genera un "Agujero de gusano"
    // Se usa solo en los componentes que usaran la store
    Provider.childContextTypes = {
        store: React.PropTypes.object
    }
    class Component1 extends Component{
        /*...*/
        render(){
            const { store } = this.context
            /*...*/
        }
    }
    Component1.childContextTypes = {
        store: React.PropTypes.object
    }
    
    ReatDOM.render(
        <Provider store={STORE}>
            <App />
        </Provider>
    )
    ```
- Además, podemos usar el metodo *connect* de *react-redux* para generar componentes. Con este, los componentes creados tendrán acceso directo a todo el estado de la *store*, y a hacer *dispatch* dentro del componente.
   ```js
   // Props que se entregaran formadas a partir de state
     const mapStateToProps = (state, ownProps) => {
        return {
            props: generatePropsFromState(state...)
        }
     }
     // Props que se entregaran que usan la store (dispatch)
     const mapDispatchToProps = (dispatch, ownProps){
        return{
            methodWithDispatch: func()
        }
     }
     const { connect } = ReactRedux;
     const ContainerComponent = connect(mapStateToProps, mapDispatchToProps)(PresentationalComponent)
     // Si usamos connect(), entregara por defecto un objeto vacio para los de estado y dispatch como función.
    ```
- *Action Creator*: Son funciones que entregan los objetos de las acciones, de forma de no dejar esta logica en los componentes. Se colocan al inicio del codigo como buena práctica y así se sabe que acciones se pueden realizar. Uno común se ve:
     ```js
     function incrementCounter(){
          return({
               type: "INCREMENT_COUNTER"
          })
     }
     ```
