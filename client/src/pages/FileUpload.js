import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { Progress } from '../components';
import isEmpty from '../util/is-empty';

const FileUpload = () => {
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState('Choose file');
  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [message, setMessage] = useState('');

  const toastConfig = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isEmpty(message)) {
      if (!isEmpty(uploadedFile)) {
        toast.success(
          <><FontAwesomeIcon icon={faCheckCircle} size="1x" />&nbsp;{message}</>,
          toastConfig
        );
      } else {
        toast.error(
          <><FontAwesomeIcon icon={faExclamationCircle} size="1x" />&nbsp;{message}</>,
          toastConfig
        );
      }
    }
  }, [message])

  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    setUploadedFile({});
    setUploadPercentage(0);
    setMessage('');
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    setUploadedFile({});
    setMessage('');

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

      const { fileName, filePath } = await res.data;

      setUploadedFile({ fileName, filePath });
      setMessage('File uploaded');
    } catch (error) {
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

    setFile({});
    setFileName('Choose file');
  };

  return (
    <>
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

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable={false}
        pauseOnHover
      />
    </>
  );
}

export default FileUpload;
