import React from 'react';
import { setUsernameValue, setPasswordValue, loginStart, loginSuccess, loginFailure } from '../../store/auth/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getNewRoute } from '../../utils/getNewRoute';
import { connexion, generateMenu } from '../../service/auth';
import { putInLocalStorage } from '../../service/globalFunction';

export default function useAuth() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const { authentication } = useSelector((state) => state.auth);

  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [receiveProfilId, setReceiveProfilId] = React.useState('');
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertSeverity, setAlertSeverity] = React.useState('success');

  console.log({ receiveProfilId });

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    if (username === '' && password === '') {
      return;
    }

    try {
      dispatch(loginStart());
      const response = await connexion(username, password);

      if (response?.reponse === 'success') {
        // sauvegarder dans localStorage via putInLocalStorage
        putInLocalStorage('user', response?.data);
        putInLocalStorage('dataChild', response?.dataChild);

        // Mettre à jour le state Redux
        dispatch(
          loginSuccess({
            user: response?.data,
            accessToken: response?.accessToken,
            refreshToken: response?.refreshToken
          })
        );

        // Attendre un peu pour s'assurer que tout est sauvegardé
        if (response?.dataChild?.length > 1) {
          const responses = await generateMenu(response?.dataChild[0]?.lgProid);
          putInLocalStorage('generateMenu', responses?.data);
          setIsModalOpen(true);
        } else if (response?.dataChild?.length === 1) {
          console.log('response', response?.dataChild[0]?.lgProid);

          const responses = await generateMenu(response?.dataChild[0]?.lgProid);
          putInLocalStorage('generateMenu', responses?.data);
          // localStorage.setItem('generateMenu', JSON.stringify(responses?.data));
          setTimeout(() => {
            navigate('/dashboard');
          }, 100);
        } else {
          setAlertMessage('Aucun profil associé à cet utilisateur.');
          setAlertSeverity('error');
          return;
        }
      } else {
        navigate('/login');
        dispatch(loginFailure(response?.message || 'Échec de la connexion'));
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      navigate('/dashboard');
      dispatch(loginFailure(error.response?.data?.message || 'Erreur de connexion'));
    }
  };
  return {
    handleClickShowPassword,
    handleSubmit,
    handleCancel,
    handleMouseDownPassword,
    handleOk,
    isModalOpen,
    setReceiveProfilId,
    setPassword,
    setUsername,
    authentication,
    getNewRoute,
    setUsernameValue,
    setPasswordValue,
    showPassword,
    alertMessage,
    alertSeverity
  };
}
