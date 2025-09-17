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
  const [numero, setNumero] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [anneeEnseignement, setAnneeEnseignement] = useState('');
  const [selectGenreEleveId, setSelectGenreEleveId] = useState('');

  const handleSubmit = async () => {
    if (
      !nom.trim() ||
      !prenom.trim() ||
      !numero.trim() ||
      !dateNaissance.trim() ||
      !selectGenreEleveId.trim() ||
      anneeEnseignement.trim()
    ) {
    }
    if (valueEdition === '') {
      const result = await dispatch(createChambre({ nom, prenom, numero, dateNaissance, selectGenreEleveId, anneeEnseignement }));

      if (createChambre.fulfilled.match(result)) {
        await dispatch(getChambres());
        handleClose();
        setNom('');
        setPrenom('');
        setNumero('');
        setDateNaissance('');
        setSelectGenreEleveId('');
        setAnneeEnseignement('');
      }
    } else if (valueEdition === 'editer') {
      const result = await dispatch(updateChambre({ nom, prenom, numero, dateNaissance, selectGenreEleveId, anneeEnseignement }));

      if (updateChambre.fulfilled.match(result)) {
        await dispatch(getChambres());
        handleClose();
        setNom('');
        setPrenom('');
        setNumero('');
        setDateNaissance('');
        setSelectGenreEleveId('');
        setAnneeEnseignement('');
      }
    }
  };

  useEffect(() => {
    if (valueEdition === 'editer' && receiveEditId) {
      dispatch(getChambre(receiveEditId));
    } else {
      setNom('');
      setPrenom('');
      setNumero('');
      setDateNaissance('');
      setSelectGenreEleveId('');
      setAnneeEnseignement('');
    }
  }, [valueEdition, receiveEditId, dispatch]);

  useEffect(() => {
    if (valueEdition === 'editer' && utilisateur) {
      setNom(utilisateur?.strUtiname || '');
      setPrenom(utilisateur.strUtilogin || '');
      setNumero('***************');
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
    numero,
    setNumero,
    dateNaissance,
    setDateNaissance,
    selectGenreEleveId,
    setSelectGenreEleveId,
    createLoading,
    createError,
    valueEdition,
    listeEcoles,
    user,
    anneeEnseignement,
    setAnneeEnseignement
  };
}
