import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//Oldalak listája
import Home from './Pages/Home';
import Admin from './Pages/Admin/admin';
import About from './Pages/About';
import Menhely from './Pages/Menhely';
import Menhelyek from './Pages/Menhelyek';
import Naptar from './Pages/Naptar';
import RegisterMenhely from './Pages/Regisztraciok/RegisterMenhely';
import RegisterFelhasznalo from './Pages/Regisztraciok/RegisterFelhasznalo';
import Login from './Pages/Regisztraciok/Login';

function App() {
  return (
    <div className="App">
       <Routes>
         <Route path='/' element={<Home/>} />
         <Route path='/admin' element={<Admin/>} />
         <Route path='/rolunk' element={<About/>} />
         <Route path='/naptar' element={<Naptar/>} />
         <Route path='/menhelyek' element={<Menhelyek/>} />
         <Route path='/regisztracio/menhely' element={<RegisterMenhely/>} />
         <Route path='/regisztracio/felhasznalo' element={<RegisterFelhasznalo/>} />
         <Route path='/bejelentkezes' element={<Login/>} />
         <Route path='/menhely/:id' element={<Menhely/>} />
       </Routes>
     </div>
  )
}

export default App
