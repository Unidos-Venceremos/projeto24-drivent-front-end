import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Timer from './Timer';
import Page from '../../components/Page';

import useIsDateAfter from '../../hooks/useIsDateAfter';

import EventInfoContext from '../../contexts/EventInfoContext';

export default function Countdown() {
  const { eventInfo, loadingEventInfo } = useContext(EventInfoContext);
  const navigate = useNavigate();
  const countdownOver = useIsDateAfter(eventInfo?.startsAt);

  //http://localhost:3000/?code=43421690725e06f5100d

  const urlParams = new URLSearchParams(window.location.search);
  console.log('urlParams, href = ', window.location.href);
  console.log('urlParams, search = ', window.location.search);
  const code = urlParams.get('code');
  console.log('urlParams, code = ', code);
  
  if(code) {
    const promise = axios.post(`${process.env.REACT_APP_API_BASE_URL}/oauth`, { code });
    promise.then((response) => {
      console.log(response);
      alert('você está logado, meu chapa! dá uma olhada no console!');
      navigate('/dashboard');
    });
    promise.catch((error) => {
      console.log(error);
      alert('ops, deu algum xabú');
    });      
    // const user = response.data;
    // console.log(user);
  }

  useEffect(() => {
    if (countdownOver) {
      navigate('/enroll');
    }
  }, [countdownOver]);

  function onZero() {
    navigate('/enroll');
  }

  if (loadingEventInfo) {
    return 'Loading...';
  }  

  function onZero() {
    navigate('/enroll');
  }

  if (loadingEventInfo) {
    return 'Loading...';
  }

  return (
    <Page background={eventInfo.backgroundImageUrl}>
      <div>Faltam</div>
      <Timer time={eventInfo.startsAt} onZero={onZero} />
      <div>Para as inscrições</div>
    </Page>
  );
}
