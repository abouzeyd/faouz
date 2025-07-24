import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEcoles } from '../../../../service/parametrage/ecole';
import { createUtilisateur, getUtilisateur, updateUtilisateur, getUtilisateurs } from '../../../../service/parametrage/utilisateurs';
import { getValueLocalStorage } from '../../../../service/globalFunction';

export default function useFormUser({ handleClose }) {
  const dispatch = useDispatch();
  const { createLoading, createError, receiveEditId, valueEdition, utilisateur, receiveId, listeEcoles } = useSelector(
    (state) => state.utilisateur
  );
  const user = getValueLocalStorage('user')?.lgUtiid;

  const [nameUser, setNameUser] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectId, setSelectId] = useState('');

  const handleSubmit = async () => {
    if (!nameUser.trim() || !loginUser.trim() || !password.trim() || !email.trim() || !phone.trim()) {
    }
    if (valueEdition === '') {
      const result = await dispatch(createUtilisateur({ nameUser, loginUser, password, email, phone, selectId }));

      if (createUtilisateur.fulfilled.match(result)) {
        await dispatch(getUtilisateurs());
        handleClose();
        setNameUser('');
        setLoginUser('');
        setPassword('');
        setEmail('');
        setPhone('');
      }
    } else if (valueEdition === 'editer') {
      const result = await dispatch(updateUtilisateur({ nameUser, loginUser, password, email, phone, receiveId, selectId }));

      if (updateUtilisateur.fulfilled.match(result)) {
        await dispatch(getUtilisateurs());
        handleClose();
        setNameUser('');
        setLoginUser('');
        setPassword('');
        setEmail('');
        setPhone('');
      }
    }
  };

  useEffect(() => {
    if (valueEdition === 'editer' && receiveEditId) {
      dispatch(getUtilisateur(receiveEditId));
    } else {
      setNameUser('');
      setLoginUser('');
      setPassword('');
      setEmail('');
      setPhone('');
    }
  }, [valueEdition, receiveEditId, dispatch]);

  useEffect(() => {
    if (valueEdition === 'editer' && utilisateur) {
      setNameUser(utilisateur.strUtiname || '');
      setLoginUser(utilisateur.strUtilogin || '');
      setEmail(utilisateur.strUtimail || '');
      setPhone(utilisateur.strUtiphone || '');
      setSelectId(utilisateur?.lgEcoid);
      setPassword('***************');
    }
  }, [utilisateur, valueEdition]);

  // useEffect(() => {
  //   if (user !== '01' && valueEdition === '') {
  //   }
  // }, []);

  useEffect(() => {
    dispatch(getEcoles());
  }, []);

  return {
    handleSubmit,
    nameUser,
    setNameUser,
    loginUser,
    setLoginUser,
    password,
    setPassword,
    email,
    setEmail,
    phone,
    setPhone,
    selectId,
    setSelectId,
    createLoading,
    createError,
    valueEdition,
    listeEcoles,
    user
  };
}
