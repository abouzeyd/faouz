/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEcoles } from '../../../../service/parametrage/ecole';
import { createChambre, getChambre, updateChambre, getChambres } from '../../../../service/parametrage/chambres';
import { getValueLocalStorage } from '../../../../service/globalFunction';

export default function useFormUser({ handleClose }) {
  const dispatch = useDispatch();
  const { createLoading, createError, receiveEditId, valueEdition, chambre, receiveId, listeEcoles } = useSelector(
    (state) => state.chambre
  );
  const user = getValueLocalStorage('user')?.lgUtiid;

  const [batiment, setBatiment] = useState('');
  const [description, setDescription] = useState('');
  const [nmbrpersonnedansChambre, setNmbrpersonnedansChambre] = useState('');
  const [selectId, setSelectId] = useState('');

  console.log({ valueEdition });

  const handleSubmit = async () => {
    if (!batiment.trim() || !description.trim() || !nmbrpersonnedansChambre.trim()) {
    }
    if (valueEdition === '') {
      const result = await dispatch(createChambre({ batiment, description, nmbrpersonnedansChambre, selectId }));

      if (createChambre.fulfilled.match(result)) {
        alert('hello');
        await dispatch(getChambres());
        handleClose();
        setBatiment('');
        setDescription('');
        setNmbrpersonnedansChambre('');
      }
    } else if (valueEdition === 'editer') {
      const result = await dispatch(updateChambre({ batiment, description, nmbrpersonnedansChambre, receiveId, selectId, receiveEditId }));

      if (updateChambre.fulfilled.match(result)) {
        await dispatch(getChambres());
        handleClose();
        setBatiment('');
        setDescription('');
        setNmbrpersonnedansChambre('');
      }
    }
  };

  useEffect(() => {
    if (valueEdition === 'editer' && receiveEditId) {
      dispatch(getChambre(receiveEditId));
    } else {
      setBatiment('');
      setDescription('');
      setNmbrpersonnedansChambre('');
    }
  }, [valueEdition, receiveEditId, dispatch]);

  useEffect(() => {
    if (valueEdition === 'editer' && chambre) {
      setBatiment(chambre?.strChanumbat || '');
      setDescription(chambre.strChadescription || '');
      setSelectId(chambre?.lgEcoid);
      setNmbrpersonnedansChambre('***************');
    }
  }, [chambre, valueEdition]);

  useEffect(() => {
    dispatch(getEcoles());
  }, []);

  return {
    handleSubmit,
    batiment,
    setBatiment,
    description,
    setDescription,
    nmbrpersonnedansChambre,
    setNmbrpersonnedansChambre,
    selectId,
    setSelectId,
    createLoading,
    createError,
    valueEdition,
    listeEcoles,
    user
  };
}
