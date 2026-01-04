import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Form from './pages/Form.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/add_contact" element={<Form updateCallback={() =>{}} />} />
      <Route path="/edit_contact/:id" element={<Form updateCallback={() =>{}} />} />
    </Routes>
  </BrowserRouter>,
)
