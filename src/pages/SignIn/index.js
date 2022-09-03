import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import qs from 'query-string';
import axios from 'axios';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import Link from '../../components/Link';
import { Row, Title, Label } from '../../components/Auth';

import EventInfoContext from '../../contexts/EventInfoContext';
import UserContext from '../../contexts/UserContext';

import useSignIn from '../../hooks/api/useSignIn';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loadingSignIn, signIn } = useSignIn();

  const { eventInfo } = useContext(EventInfoContext);
  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  useEffect(() => {
    if(code) {
      loginWithGitHub();
    }
  }, []);

  async function loginWithGitHub() {
    try {
      console.log('Tenho um code! Code = ', code);
      const user = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/oauth`, { code });
      console.log('OAUTH: ', user.data);
      setUserData(user.data);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  }

  async function submit(event) {
    event.preventDefault();

    try {
      const userData = await signIn(email, password);
      setUserData(userData);
      console.log('userData: ', userData);
      toast('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (err) {
      toast('Não foi possível fazer o login!');
    }
  } 

  function redirectToGitHub() {
    const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
    const params = {
      response_type: 'code',
      scope: 'user public_repo',
      client_id: process.env.REACT_APP_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_REDIRECT_URL,
      state: 'driven.tt'
    };

    const queryStrings = qs.stringify(params);
    const authorizationUrl = `${GITHUB_AUTH_URL}?${queryStrings}`;
    window.location.href = authorizationUrl;  
  }

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Entrar</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignIn}>Entrar</Button>
        </form>
      </Row>
      <Row>
        <h2>ou</h2>
        <Button onClick={redirectToGitHub} fullWidth>
          <h2>Login usando GitHub</h2>
          <img src={'https://www.svgrepo.com/show/332401/github.svg'} width="20px" style= { { verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' } }/>
        </Button>
      </Row>
      <Row>
        <Link to="/enroll">Não possui login? Inscreva-se</Link>
      </Row>
    </AuthLayout>
  );
}
