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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log('urlParams, href = ', window.location.href);
    console.log('urlParams, search = ', window.location.search);
    const code = urlParams.get('code');
    console.log('urlParams, code = ', code);
    
    if(code) {
      try {
        navigate('/dashboard');
        console.log(`${process.env.REACT_APP_API_BASE_URL}/auth`);
        const response = axios.post(`${process.env.REACT_APP_API_BASE_URL}/sign-in`, { code });
        const user = response.data;
        //alert('você está logado, meu chapa! dá uma olhada no console!');
        console.log(user);
      } catch (err) {
        alert('ops, deu algum xabú');
        console.log('err', err);
      }
    } else if (countdownOver) {
      navigate('/enroll');
    }
  }, [countdownOver]);

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
