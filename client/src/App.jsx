import React, {useEffect} from 'react';
import Navigation from './routes/routes'; 
import Login from './pages/Login/Login';
import token from './utils/token';
import './index.scss' 


const App = () => { 




  return (
    token == null ? <Login/> : <Navigation/>
  );
};

export default App;



