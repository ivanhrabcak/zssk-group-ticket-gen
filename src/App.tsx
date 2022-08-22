import React from 'react';
import './App.css';
import { TemplateGenerator } from './components/TemplateGenerator';
import { Tutorial } from './components/Tutorial';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Divider } from '@fluentui/react-components';
import { AdditionalInformationForm } from './components/AdditionalInformationForm';
import { ServerStatus } from './components/ServerStatus';

function App() {
  return (
    <div className="vertically-center">
      <div className="outer-container">
        <div className="container">
          
          <AdditionalInformationForm />
          
          <TemplateGenerator />

          <ServerStatus />
        </div>
        
        <Divider className="divider" vertical={true} />
        
        <Tutorial />
        

        <ToastContainer position="top-right" />
      </div>
    </div>
  )
}
  
export default App;