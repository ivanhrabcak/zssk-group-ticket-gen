import React, { Ref, useEffect, useRef, useState } from 'react';
import { TemplateData, TemplateHandler } from 'easy-template-x';
import { toast } from 'react-toastify';
import { read, utils } from 'xlsx';
import { Buffer } from 'buffer';
import JSZip from 'jszip';

import '../css/TemplateGenerator.css';
import { Button, Label } from '@fluentui/react-components';
import { Checkmark48Filled, Folder48Filled } from '@fluentui/react-icons';
import { AdditionalInformation, defaultTrain, Train } from './AdditionalInformationForm';

type Member = {
  Name: string
  Birthdate: string
  CardNumber: string
  Cathegory: string
};

type DownloadableFile = {
  filename: string
  content: Blob
}

const padTo20 = (members: Member[]): Member[] => {
  const newMembers = [...members];
  if (members.length < 20) {
    for (let i = 0; i < 20 - members.length; i++) {
      newMembers.push({ Name: '', Birthdate: '', CardNumber: '', Cathegory: '' });
    }
  }

  return newMembers;
}

const padTo8 = (trains: Train[]): Train[] => {
  const newTrains = [...trains];
  if (trains.length < 8) {
    for (let i = 0; i < 8 - trains.length; i++) {
      newTrains.push(defaultTrain());
    }
  }

  return newTrains;
}

export const TemplateGenerator = ({additionalInformationRef}: {additionalInformationRef: React.MutableRefObject<AdditionalInformation | null>}) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [membersFile, setMembersFile] = useState<File | null>(null);

  const fileInput = useRef<HTMLInputElement>(null);
  const selectFile = () => {
    fileInput?.current?.click();
  }

  const submit = () => {
    if (!membersFile) {
      toast.error('No file selected!'); 
      return;
    }
    
    const generateDocument = async (members: Member[], downloadName: string, templateFile: Blob): Promise<DownloadableFile> => {
      const additionalInfo = additionalInformationRef.current;

      if (!additionalInfo) {
        alert('ERROR!');
        return { filename: 'error', content: new Blob()};
      }
      
      let trains = additionalInformationRef.current?.trains;

      if (!trains) {
        alert('ERROR!');
        return { filename: 'error', content: new Blob()};
      }

      trains = padTo8(trains);

      const t = trains?.slice(0, trains.length / 2)
      const t1 = trains?.slice(trains.length / 2, trains.length);

      if (!t || !t1) {
        alert('ERROR!');
        return { filename: 'error', content: new Blob()};
      }

      const data: TemplateData = {
        trains: [1, 2, 3, 4].map((_, i) => {
          return {...t[i], 
                  train1date: t1[i].dateOfDeparture, 
                  train1N: t1[i].trainNumber,
                  train1from: t1[i].from,
                  train1to: t1[i].to 
                }
        }),
        ...additionalInfo.leader,
        ...additionalInfo.organization,
        members: [...members.map((x, i) => { return {...x, entryn: i + 1} })],
        n: members.reduce((acc, x) => (x.Name || x.Birthdate || x.CardNumber || x.Cathegory) ? acc + 1 : acc, 0)
      };

      console.log({data});

      const handler = new TemplateHandler();
      const doc = await handler.process(templateFile, data);

      return {filename: downloadName, content: doc};
    }

    const parseMembers = async () => {
        const fileResponse = await fetch(`${process.env.PUBLIC_URL}/template.docx`);
        const templateFile = await fileResponse.blob();
        
        const data = await membersFile.arrayBuffer();
        const workbook = read(data);

        const files = [];
        const members = utils.sheet_to_json<Member>(workbook.Sheets[workbook.SheetNames[0]]);
        for (let i = 0; i < members.length / 20; i++) {
          const twentySubset = padTo20(members.slice(i, i + 20));
          console.log({twentySubset});
          files.push(await generateDocument(twentySubset, `part${i + 1}.docx`, templateFile));
        }

        const zip = new JSZip();
        
        await Promise.all(files.map(async x => {
          const arrayBuffer = await x.content.arrayBuffer();
          zip.file(x.filename, Buffer.from(arrayBuffer).toString('base64'), {base64: true});
        }));

        const blob = await zip.generateAsync({type: 'blob'});
        
        const downloadURL = URL.createObjectURL(blob);

        const tempLink = document.createElement('a');
        tempLink.href = downloadURL;
        tempLink.setAttribute('download', 'output.zip');
        tempLink.click();
    }

    parseMembers()
  };


  useEffect(() => {
    if (!selectedFiles) {
        return;
    }
    
    for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];

        if (file.name.endsWith('.xlsx')) {
        setMembersFile(file);
        return;
        }
    }

    toast.error('No .xlsx file was selected!');
    setSelectedFiles(null);

  }, [selectedFiles]);


  return (
    <div className="container">
      <Label size="large">Generate:</Label>
      
      <div className="inline">
        Choose your .xlsx file here:
        <Button onClick={() => selectFile()} size="large" icon={selectedFiles === null ? <Folder48Filled /> : <Checkmark48Filled />} />
      </div>

      <Button disabled={additionalInformationRef === null} onClick={() => submit()}>Generate Files</Button>

      <input onChange={(e) => setSelectedFiles(e.target.files)} type="file" accept=".xlsx" style={{ "display": "none" }} ref={fileInput} />
    </div>
  );
}