import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Pages/Home';
import "./Scss/Styles.scss";
import "./Scss/Keyframes.scss";
import Post from './Pages/Post';
import BackgroundContext from './Contexts/BackgroundContext';
import CatContext from './Contexts/CatContext';
import GetCatContext from './Contexts/GetCatContext';

function App() {

  const [background, setBackground] = useState([]);
  const [catValue, setCatValue] = useState([]);
  const [getCat, setGetCat] = useState([]);

  return (
    <div className="App"> 
      <GetCatContext.Provider value={{getCat, setGetCat}} >
      <BackgroundContext.Provider value={{background, setBackground}} >
      <CatContext.Provider value={{catValue, setCatValue}} >
      <Router>
        <Switch>
            <Route path="/day/:id" component={Post} />
            <Route path="/" component={Home} />
          </Switch>
      </Router>
      </CatContext.Provider>
      </BackgroundContext.Provider>
      </GetCatContext.Provider>
    </div>
  );
}

export default App;
