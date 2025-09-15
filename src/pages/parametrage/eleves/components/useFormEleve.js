/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEcoles } from '../../../../service/parametrage/ecole';
import { createChambre, getChambre, updateChambre, getChambres } from '../../../../service/parametrage/chambres';
import { getValueLocalStorage } from '../../../../service/globalFunction';

export default function useFormUser({ handleClose }) {
  const dispatch = useDispatch();
  const { createLoading, createError, receiveEditId, valueEdition, utilisateur, receiveId, listeEcoles } = useSelector(
    (state) => state.utilisateur
  );
  const user = getValueLocalStorage('user')?.lgUtiid;

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numeroParent, setNumeroParent] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [selectTypeEleveId, setSelectTypeEleveId] = useState('');
  const [selectGenreEleveId, setSelectGenreEleveId] = useState('');

  const handleSubmit = async () => {
    if (
      !nom.trim() ||
      !prenom.trim() ||
      !numeroParent.trim() ||
      !dateNaissance.trim() ||
      !selectTypeEleveId.trim() ||
      !selectGenreEleveId.trim()
    ) {
    }
    if (valueEdition === '') {
      const result = await dispatch(createChambre({ nom, prenom, numeroParent, dateNaissance, selectTypeEleveId, selectGenreEleveId }));

      if (createChambre.fulfilled.match(result)) {
        await dispatch(getChambres());
        handleClose();
        setNom('');
        setPrenom('');
        setNumeroParent('');
        setDateNaissance('');
        setSelectTypeEleveId('');
        setSelectGenreEleveId('');
      }
    } else if (valueEdition === 'editer') {
      const result = await dispatch(updateChambre({ nom, prenom, numeroParent, dateNaissance, selectTypeEleveId, selectGenreEleveId }));

      if (updateChambre.fulfilled.match(result)) {
        await dispatch(getChambres());
        handleClose();
        setNom('');
        setPrenom('');
        setNumeroParent('');
        setDateNaissance('');
        setSelectTypeEleveId('');
        setSelectGenreEleveId('');
      }
    }
  };

  useEffect(() => {
    if (valueEdition === 'editer' && receiveEditId) {
      dispatch(getChambre(receiveEditId));
    } else {
      setNom('');
      setPrenom('');
      setNumeroParent('');
      setDateNaissance('');
      setSelectTypeEleveId('');
      setSelectGenreEleveId('');
    }
  }, [valueEdition, receiveEditId, dispatch]);

  useEffect(() => {
    if (valueEdition === 'editer' && utilisateur) {
      setNom(utilisateur?.strUtiname || '');
      setPrenom(utilisateur.strUtilogin || '');
      setSelectTypeEleveId(utilisateur?.lgEcoid);
      setNumeroParent('***************');
    }
  }, [utilisateur, valueEdition]);

  useEffect(() => {
    dispatch(getEcoles());
  }, []);

  return {
    handleSubmit,
    nom,
    setNom,
    prenom,
    setPrenom,
    numeroParent,
    setNumeroParent,
    dateNaissance,
    setDateNaissance,
    selectTypeEleveId,
    setSelectTypeEleveId,
    selectGenreEleveId,
    setSelectGenreEleveId,
    createLoading,
    createError,
    valueEdition,
    listeEcoles,
    user
  };
}
