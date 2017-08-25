# React-Redux application
---
Estos son los pasos para crear una aplicación con react-redux

1. Crear aplicación
    ```sh
    $ create-react-app App
    $ yarn add redux react-redux
    ```
2. Crear acciones
    ```js
    // ~/actions.js
    let movieId = 0;
    export function addMovie(name){
        return({
                type: "ADD_MOVIE",
                name,
                id: movieId++
            })
    }
    export function deleteMovie(id){
        return({
            type: "DELETE_MOVIE",
            id
        })
    }
    ```
3. Crear Reducer
    ```js
    // reducers/REDUCER.js
    export const movies = (state = [],action ) => {
    switch(action.type){
        case "ADD_MOVIE":
            return [...state, {name: action.name, id: action.id}]
        case "DELETE_MOVIE":
            let index = state.findIndex((element) => element.id === action.id);
            return [...state.slice(0,index), ...state.slice(index+1)]
        default:
            return state
        }
    }
    ```
4.  Crear Presentationals Components
     ```js
     // ./components/movie.js
     class MovieRowDisplay extends Component{
        render = () => {
        const {id, name, onClick} = this.props;
        return(
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td><button onClick={onClick}>Eliminar</button></td>
            </tr>
        )}
    }
    // ./components/button-display.js
    export const ButtonDisplay = ({onClick, text}) => (
        <button onClick={onClick}>{text}</button>
    )
     ```
5.  Crear ContainerComponents
    ```js
    const mapStateToProps = (state, ownProps) => {
    return({
        id: ownProps.id,
        name: ownProps.name
        })
    }
    const mapDispatchToProps = (dispatch, ownProps) => {
        return({
            onClick: () => dispatch(deleteMovie(ownProps.id))
        })
    }
    const MovieRow = connect(mapStateToProps, mapDispatchToProps)(MovieRowDisplay);
    ```
6. Otros componentes
    ```js
    let AddTodo = ({ dispatch }) => {
      let input
      return (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault()
              if (!input.value.trim()) {
                return
              }
              dispatch(addTodo(input.value))
              input.value = ''
            }}
          >
            <input
              ref={node => {
                input = node
              }}
            />
            <button type="submit">
              Add Todo
            </button>
          </form>
        </div>
      )
    }
    AddTodo = connect()(AddTodo)
    ```
7. Unión de aplicación
    ```js
    const reducers = combineReducers({
        movies
    });
    const store = createStore(reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    
    
    ReactDOM.render(
            <Provider store={store}>
                <App />        
            </Provider>, 
            document.getElementById('root')
            );
    ```

