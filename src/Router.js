import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import App from './App';
import CandidateList from './CandidateList';

export default function Router() {
  return (
    <div>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<App/>}></Route>
            <Route path='/view' element={<CandidateList/>}></Route>
        </Routes>
        </BrowserRouter>
    </div>
  )
}
