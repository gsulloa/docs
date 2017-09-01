# React
## Requisitos
Tener instalado [Node.js](https://nodejs.org) en la última versión.
## Inicio
Primero instalaremos **yarn**, que es una alternativa más rápida que *npm*
```sh
# macOS
$ brew install yarn
# Ubuntu/Debian
$ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
$ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
$ sudo apt-get update && sudo apt-get install yarn
```
Para otros entrar a la [documentación](https://yarnpkg.com/lang/en/docs/install/).

Luego, instalaremos un "creador base" para una aplicación de ReactJS provisto por Facebook. 
```sh
$ npm install -g create-react-app
$ create-react-app app

$ cd app
$ yarn start
```
Luego, recomiendo seguir uno de estos tutoriales:
- [Documentación Facebook](https://facebook.github.io/react/docs/hello-world.html): Se explica bien cada parte por separado y recomiendan usar este [editor](http://codepen.io/gaearon/pen/ZpvBNJ?editors=0010) para probar React sin descargar nada.
- [Video2Brain: ReactJS de 0 a 100](https://mega.nz/#!rY9EEY5Z!vg14xNOkV4eJV1kZUOu1vrDb8lEGSq_JBdUj8u9bkUU) (contraseña: gratisypormega.blogspot.mx): Recomiendo estos videos, se explica muy bien todo, desde los fundamentos hasta como usarlo.

## Resumen
Lo más importante:
- Una de las gracias de React es que trabaja con un *VirtualDOM*, en el cuál se revisa que cosas del *DOM* realmente cambiarán por el cambio de estado. De esta forma solo modifica estos de forma óptima.
- Para crear una nueva aplicación de ReactJS usamos
  ```sh
  $ create-react-app nombre-app
  ```
- La unidad básica de ReactJS son los componentes. Estos tienen propiedades, y un estado que definirá su vista. En general se escriben de las siguientes formas
  ```js
  import React, { Component } from 'react';
  // Como clase 
  class Hello extends Component{
    // Definición del estado inicial
    state = {
        name: this.props.name
    }
    //OPCIONALES UTILES
    
    // Función que se ejecutará después de cargar el componente. Es útil para ejecutar otras funciones que requieren que el componente ya esté cargado, como cambiar datos, trabajar con gráficos, etc
    componentDidMount = () => {
        ...
    }
    
    //Función que se ejecutará antes de cargar el componente. Es útil para hacer procesos como request de APIs que daran algún estado del componente.
    componentWillMount = () => {
        ...
    }
    
    // OBLIGATORIO
    // retorna el output del componente
    render = () => {
        return(<h1>Hello {this.state.name}</h1>)
    }
  }
  // Como función (Ojo, de esta forma no permite estado)
  const Hello = ({name}) => {
    return(<h1>Hello {name} </h1>)
  }
  ```
- Para renderizar usamos:
  ```js
    import ReactDOM from 'react-dom';
    ReactDOM.render(<Componente prop1="texto" prop2={funcion} ... />, document.getElementById('id_del_div_donde_se_renderiza');
  ```
- Como *props* de los componentes podemos entregar lo que sea: string, funciones, "objetos", etc.
- Al entregar una metodo propio a un componente hijo, al ejecutarse la del hijo afectará al padre. Por ejemplo:
    ```js
    class ToDoList extends Component{
        state = {list: []}
        onAddElement = () => {
            const newList = this.state.list;
            newList.push("new element");
            this.setState({
                list: newList
              })
        }
        render = () => {
            return(
                <div>
                    <ul>
                    {this.state.list.map(element => <Element content={element} />)}
                    </ul>
                    <Button addElement={this.onAddElement} />
                </div>
            )
        }
    }
    const Element = ({content}) => <li>{content}</li>
    const Button = ({addElement}) => <button onClick={addElement}>Agregar</button>
    ```
- Es bueno utilizar [complementos en Chrome](https://chrome.google.com/webstore/search/react%20developer), son muy utiles para debug

## Pasos posteriores
Luego de ver los tutoriales y haber jugado más con React, seguiremos con entender [Redux](http://redux.js.org/). De esto, tengo notas en el siguiente [link](https://github.com/gsulloa/docs/tree/master/redux).

Luego, para hacer una aplicación con ReactJS y redux, propóngo los pasos en el siguiente doc: [ReactJS + Redux](https://github.com/gsulloa/docs/blob/master/react/react-redux.md).

Finalemente, para hacer una aplicación con ReactJS, redux y ReactRouter (para utilizar las rutas), veremos el siguiente doc: [ReactJS + Redux + React Router](https://github.com/gsulloa/docs/blob/master/react/react-router-redux.md)
## Packeges Útiles:
Aca hay una serie de packages utiles, algunos vienen con React, y otros deberemos incorporarlos según necesidad. En algunos importante, agregue el link de su repositorio para revisarlos.
- react: Paquete principal de React.
- react-dom: Paquete principal de React que permite trabajar con el *DOM*
- react-helmet: Entrega la componente ```<Helmet />``` que permite inyectar dinamicamente elementos al header del html
- react-redux: Paquete que entrega componentes utiles para juntar React y Redux
- react-router: Entrega las funcionalidades basicas para trabajar con la URL
- history: Entrega el historial para manejar las rutas
- react-router-dom: Componentes de DOM para manejar las rutas
- react-router-redux: Unifica React, Redux y el enrutador
- redux: Paquete que permite trabajar con metodología redux, dejando todo en un estado unico que cambia con acciones
- redux-logger:
- redux-persist:
- redux-promise-middleware:
- [redux-thunk](https://github.com/gaearon/redux-thunk): Permite llamar desde acciones a dispatchs (para acciones asincronas).
- reselect: Permite optimizar la generacion de props con acciones
- [styled-components](https://github.com/styled-components/styled-components): Crea componentes basicos de html con vistas especificas
- [popsicle](https://github.com/blakeembrey/popsicle): HTTP requests
- prop-types: Define los componentes obligatorios que deben tener algunos componentes
- [lodash](https://lodash.com/docs/4.17.4): Forma más eficiente de trabajar listas y objetos
