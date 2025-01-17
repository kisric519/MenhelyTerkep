import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//Oldalak listája
import Home from './scenes/Home';
import About from './scenes/About';

function App() {
  return (
    <div className="App">
       <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/rolunk' element={<About/>} />
       </Routes>
     </div>
  )
}

export default App
