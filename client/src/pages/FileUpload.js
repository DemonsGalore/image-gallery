import React, { useState } from 'react';
import axios from 'axios';

import { Progress } from '../components';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose file');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setUploadPercentage(0);
    setMessage('');
  };

  const onSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(parseInt(Math.round(progressEvent.loaded * 100) / progressEvent.total));
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File uploaded');
    } catch (error) {
      console.log(error.response);
      
      if (error.response.status === 500) {
        if (error.response.data.message) {
          setMessage(error.response.data.message);
        } else {
          setMessage('There was a problem with the server.');
        }
      } else {
        setMessage(error.response.data.message);
      }
    }
  };

  return (
    <>
      { message && <p>{message}</p> }
      <form onSubmit={onSubmit}>
        <div>
          <input type="file" id="image-upload" name="image" onChange={onChange} />
          <label htmlFor="image-upload">{fileName}</label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input type="submit" value="Upload" />
      </form>

      { uploadedFile && <div>
        <div>
          <h3>{ uploadedFile.fileName }</h3>
          <img style={{ width: '100%' }} src={uploadedFile.filePath} alt="" />
        </div>
      </div> }
    </>
  );
}

export default FileUpload;
