import React, { useRef, useState } from 'react';
import './App.css';
import { TemplateGenerator } from './components/TemplateGenerator';
import { Tutorial } from './components/Tutorial';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Divider } from '@fluentui/react-components';
import { AdditionalInformation, AdditionalInformationForm } from './components/AdditionalInformationForm';
import { ServerStatus } from './components/ServerStatus';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function App() {
  const [width, setWidth] = useState(getWindowDimensions().width);
  const setWidthRef = useRef<React.Dispatch<React.SetStateAction<number>>>(setWidth);
  const [additionalInformation, setAdditionalInformation] = useState<AdditionalInformation | null>(null);
  const additionalInformationRef = useRef(additionalInformation);

  console.log({additionalInformation})

  additionalInformationRef.current = additionalInformation;
  setWidthRef.current = setWidth;

  window.onresize = () => {
    setWidthRef.current(getWindowDimensions().width);
  };

  if (width < 920) {
    return (
      <div>
        Your screen is too thin! (it has to be at least 920 pixels wide)
      </div>
    )
  }
  if (width < 1340) {
    return (
      <div>
        <Tutorial />
        <div className="container">
          <AdditionalInformationForm setAdditionalInformation={setAdditionalInformation} />
          <TemplateGenerator additionalInformationRef={additionalInformationRef} />
        </div>
        
        <ToastContainer position="top-right" />
        <ServerStatus />
      </div>
    );
  }

  return (
    <div className="vertically-center">
      <div className="outer-container">
        <div className="container">
          <AdditionalInformationForm setAdditionalInformation={setAdditionalInformation} />
          <TemplateGenerator additionalInformationRef={additionalInformationRef} />
        </div>
        
        <Divider className="divider" vertical={true} />
        
        <Tutorial />
        <ToastContainer position="top-right" />
      </div>
    </div>
  )
}
  
export default App;