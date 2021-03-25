
import './styleOne.css';
import {Route} from 'react-router-dom';
import Start from './Start';
import Call from './Call';
  
  
  function App() {
    return (
      <div className="App">
        <Route exact path = "/" component = {Start} />
        <Route exact path = "/Call" component = {Call} />
      </div>
    );
  }
  
  export default App;
