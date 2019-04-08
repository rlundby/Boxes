import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.css';
import './custom.css';

// Import components
import Main from './Views/Main';
import AddNew from './Views/AddNew';
import ListAll from './Views/ListAll';
import Navigation from './Components/Header/Navigation'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navigation/>
        <div className="main-content" style={{minHeight: '500px'}}>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Main}/>
                <Route path='/addbox' component={AddNew}/>
                <Route path='/listboxes' component={ListAll}/>
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
