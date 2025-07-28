import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEcoles, createEcole, getEcole, deleteEcole, updateEcole } from '../../../../service/parametrage/ecole';

// import { createEcole, getEcole, updateEcole, getEcoles } from '../../../../service/parametrage/utilisateurs';

export default function useFormUser({ handleClose }) {
  const dispatch = useDispatch();
  const { createLoading, createError, receiveEditId, valueEdition, utilisateur, receiveId, listeEcoles, ecole } = useSelector(
    (state) => state.ecole
  );

  console.log({ valueEdition });

  const [nameEcole, setNameEcole] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectId, setSelectId] = useState('');

  const handleSubmit = async () => {
    if (!nameEcole.trim() || !localisation.trim() || !email.trim() || !phone.trim()) {
    }
    if (valueEdition === '') {
      const result = await dispatch(createEcole({ nameEcole, localisation, email, phone }));

      if (createEcole.fulfilled.match(result)) {
        await dispatch(getEcoles());
        handleClose();
        setNameEcole('');
        setLocalisation('');
        setEmail('');
        setPhone('');
      }
    } else if (valueEdition === 'editer') {
      const result = await dispatch(updateEcole({ nameEcole, localisation, email, phone, receiveId }));

      if (updateEcole.fulfilled.match(result)) {
        await dispatch(getEcoles());
        handleClose();
        setNameEcole('');
        setLocalisation('');
        setEmail('');
        setPhone('');
      }
    }
  };

  useEffect(() => {
    if (valueEdition === 'editer' && receiveId) {
      dispatch(getEcole(receiveId?.key));
    } else {
      setNameEcole('');
      setLocalisation('');
      setEmail('');
      setPhone('');
    }
  }, [valueEdition, receiveId, dispatch]);

  useEffect(() => {
    if (valueEdition === 'editer' && ecole) {
      setNameEcole(ecole?.strEcodescription || '');
      setLocalisation(ecole.strEcolocalisation || '');
      setEmail(ecole.strEcomail || '');
      setPhone(ecole.strEcophone || '');
    }
  }, [ecole, valueEdition]);

  return {
    handleSubmit,
    nameEcole,
    setNameEcole,
    localisation,
    setLocalisation,
    email,
    setEmail,
    phone,
    setPhone,
    selectId,
    setSelectId,
    createLoading,
    createError,
    valueEdition,
    listeEcoles
  };
}
