# ReactRouter
----
ReactRouter es una librería que ayuda a controlas las URL usando React

## Instalación
Para empezar una aplicación con ReactRouter v4, debemos hacer:
```sh
create-react-app NAME
cd NAME
yarn add react-router-dom
```
## HelloWorld
```js
import React from 'react';
import {BrowserRouter as Router,Route } from 'react-router-dom';

const Home = () => (
  <h1>Home</h1>
)

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/about" render={() => <h1>About</h1>} />
      <Route path="/childrenAlways" children={() => <h1>Children Always</h1>} />
      <Route path="/childrenMatch" children={({match}) => match && <h1>Children Match</h1>} />
    </div>
  </Router>
);

export default App;

```


## Datos Claves
- **Route**: Componente al que se le entrega el path (expresión regular) y el componente que se debe renderizar
    - **path**: ruta
    - **Renderizar**: Existen tres formas de renderizar:
        - **component**: Renderiza un componente especifico
        - **render**: Renderiza lo retornado por una función
        - **children**: Renderiza **SIEMRE** una función
            -  si agregamos ``` ({match}) => match && ...``` renderizará haciendo match.
    - *exact*: Agregaremos para que use la ruta exacta y no expresión regular
    - *strict*: Agregaremos para hacer más identico la ruta ("/about/" != "/about")
- **Router**: Componente que tendrá muchos *route*
- **Link**: Componente que cambia la ruta.

