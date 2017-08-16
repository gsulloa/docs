# Redux
----
"*Redux is a predictable state container for JavaScript apps.*" ([Redux](http://redux.js.org/)).
Redux busca mantener toda la información necesaria en un estado unico, basandose en la ídea de que un estado tiene una única vista.

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
- **Reducer**: Recibe como entrada un estado y una acción. Retorna un nuevo estado. Es importante notar que se CREA un nuevo estado, NO se modifica (función pura).
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
- Para no usar un unico gran *reducer*, lo que haremos es componerlos con **combineReducers***. En este caso, llama a cada reducer con el estado de nombre *state.reducer*
    ```js
    const { combineReducers } = Redux;
    const app = combineReducers({ reducer1, reducer2, reducer3 })
    ```

