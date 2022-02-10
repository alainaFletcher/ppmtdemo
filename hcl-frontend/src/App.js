import './App.css';
import "./sass/main.min.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import Routes from './Routes'
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import store from "./store"
import { updateToken } from './helpers/securityUtils';

updateToken(store);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
         <Routes/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
