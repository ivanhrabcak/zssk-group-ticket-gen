import React from 'react';
import './App.css';
import { TemplateGenerator } from './components/TemplateGenerator';
import { Tutorial } from './components/Tutorial';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <Tutorial />
      
      <h1>Enter Additional Information:</h1>

      <h1>Generate</h1>
      <TemplateGenerator />
      <ToastContainer position="top-right" />
    </div>
  )
}
  
export default App;