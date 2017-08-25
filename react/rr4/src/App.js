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
