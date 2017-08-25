# React-Router-Redux application
---
Estos son los pasos para crear una aplicación con react-router-redux. Considero ya iniciada una aplicación con [react-router](https://github.com/gsulloa/docs/blob/master/react/react-redux.md)

1. Agregar React Router Redux
    ```sh
    $ yarn add react-router-dom react-router-redux
    ```
2. Agregar imports a index
    ```js
    import { ... , applyMiddleware } from 'redux';
    
    import createHistory from 'history/createBrowserHistory'
    import { Route } from 'react-router'

    import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
    ```
3. Crear history y middleWare pertinentes
    ```js
    // Create a history of your choosing (we're using a browser history in this case)
    const history = createHistory();
    
    // Build the middleware for intercepting and dispatching navigation actions
    const middleware = routerMiddleware(history);
    ```
3.  Agregar nuevos elementos a store
    ```js
    const store = createStore(
      combineReducers({
        ...reducers,
        router: routerReducer
      }),
      applyMiddleware(middleware)
    )
    ```
4. Cambiar render en dom
    ```js
    ReactDOM.render(
        <Provider store={store}>
            { /* ConnectedRouter will use the store from Provider automatically */ }
            <ConnectedRouter history={history}>
                <div>
                    <Route exact path="/" component={App}/>
                    <Route path="/:id" render={({match}) =>{
                        const params = match.params;
                        return(
                            <h1>{params.id}</h1> 
                        )
                        }}/>
                </div>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root'));
    ```
    
## Componentes
- Para inyectar history
    ```js
    import { withRouter } from 'react-router-dom'
    // this also works with react-router-native
    
    export const GoSomewhere = withRouter(({ history}) => (
      <ButtonDisplay
        text = {"go"}
        onClick={() => { history.push('/go') }}
      >
        Click Me!
      </ButtonDisplay>
    ))
    ```
- Para inyectar history en componente definido como clase
    ```js
    class Componente extend Components{
    ...
        render = () => {
            const { match, location, history } = this.props
            return (
              <div>You are now at {location.pathname}</div>
            )
        }
    }
    const ComponenteWithRouter = withRouter(Componente)
    ```
- Para solo navegar ([documentación](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md))
    ```js
    import { Link } from 'react-router-dom'
    <Link to={{
      pathname: '/courses',
      search: '?sort=name',
      hash: '#the-hash',
      state: { fromDashboard: true }
    }}/>
    ```


