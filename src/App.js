import { BrowserRouter, Navigate, Route, Router, Routes, } from 'react-router-dom';
import './App.css';
import { CRUD } from './components/componentIndex';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/react'>
            <Route path='crud' element={<CRUD/>}/>
            <Route path='' element={<Navigate to="crud"/>}/>
            <Route path='*' element={<h1> 404 Page Not Found! </h1>}/>
          </Route>
          <Route path='' element={<Navigate to="/react"/>}/>
          <Route path='*' element={<h1> 404 Page Not Found! </h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}