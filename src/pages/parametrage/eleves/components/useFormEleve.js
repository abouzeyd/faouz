/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEcoles } from '../../../../service/parametrage/ecole';
import { getValueLocalStorage } from '../../../../service/globalFunction';
import { getEleves, updateEleve, getEleve, createEleve } from '../../../../service/parametrage/eleves';
import { getListes } from '../../../../service/parametrage/typeListe';
import { getChambres } from '../../../../service/parametrage/chambres';

import toast from 'react-hot-toast';

export default function useFormUser({ handleClose }) {
  const dispatch = useDispatch();
  const { createLoading, createError, receiveEditId, valueEdition, eleve, receiveId, listNationalite, listChambres } = useSelector(
    (state) => state.eleve
  );
  const user = getValueLocalStorage('user')?.lgUtiid;

  console.log({ listNationalite });

  const [batiment, setBatiment] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [dteNaissance, setDteNaissance] = useState('');
  const [lieuNaissance, setLieuNaissance] = useState('');
  const [refExtrait, setRefExtrait] = useState('');
  const [numPiece, setNumPiece] = useState('');
  const [nomPere, setNomPere] = useState('');
  const [profession, setProfession] = useState('');
  const [contactPere, setContactPere] = useState('');
  const [nomMere, setNomMere] = useState('');
  const [professionMere, setProfessionMere] = useState('');
  const [contactMere, setContactMere] = useState('');
  const [halakat, setHalakat] = useState('');
  const [numeroLit, setNumeroLit] = useState('');
  const [dateInscription, setDateInscription] = useState('');
  const [receiveValueSexe, setReceiveValueSexe] = useState('');
  const [receiveValueTypeEleve, setReceiveValueTypeEleve] = useState('');

  const [receiveIdCharge, setReceiveIdCharge] = useState('');
  const [description, setDescription] = useState('');
  const [nmbrpersonnedansChambre, setNmbrpersonnedansChambre] = useState('');
  const [selectId, setSelectId] = useState('');
  const [selectNationaliteId, setSelectNationaliteId] = useState('');
  const [valueNiveauEtude, setValueNiveauEtude] = useState('');
  const [valueCoranEleve, setValueCoranEleve] = useState('');
  const [provenance, setProvenance] = useState('');
  const [selectChambreId, setSelectChambreId] = useState('');

  const sexe = [
    { label: 'Fille', value: 'Fille' },
    { label: 'Garcon', value: 'Garcon' }
  ];

  const priseCharge = [
    { label: 'NON PRIS EN CHARGE', value: '0' },
    { label: 'ONG', value: '1' },
    { label: 'PARTICULIER', value: '2' },
    { label: 'FONDATEUR', value: '3' }
  ];

  const niveauEleve = [
    { label: 'Coran', value: '0' },
    { label: 'Alphabert', value: '1' },
    { label: 'autre', value: '2' }
  ];

  const coranEleve = [
    { label: 'Hifz 10', value: '0' },
    { label: 'Hifz 1', value: '1' },
    { label: 'Hifz 9', value: '2' }
  ];

  const typeEleve = [
    { label: '', value: '' },
    { label: 'INTERNE', value: '0' },
    { label: 'EXTERNE', value: '1' }
  ];

  console.log({ selectNationaliteId });

  const handleSubmit = async () => {
    if (!batiment.trim() || !description.trim() || !nmbrpersonnedansChambre.trim()) {
    }
    if (valueEdition === '') {
      const result = await dispatch(
        createEleve({
          nom,
          prenom,
          receiveValueSexe,
          dteNaissance,
          lieuNaissance,
          refExtrait,
          numPiece,
          provenance,
          nomPere,
          profession,
          contactPere,
          nomMere,
          professionMere,
          contactMere,
          receiveValueTypeEleve,
          receiveIdCharge,
          halakat,
          numeroLit,
          batiment,
          dateInscription,
          selectId,
          valueNiveauEtude,
          valueCoranEleve,
          selectNationaliteId,
          selectChambreId
        })
      );

      if (createEleve.fulfilled.match(result)) {
        await dispatch(getEleves());
        handleClose();
        toast.success(`${result?.payload?.message} `);
        setBatiment('');
        setDescription('');
        setNmbrpersonnedansChambre('');
      } else if (createEleve.rejected.match(result)) {
        toast.error(`${result?.payload?.message} `);
      }
    }
    if (valueEdition === 'editer') {
      const result = await dispatch(
        updateEleve({
          nom,
          prenom,
          receiveValueSexe,
          dteNaissance,
          lieuNaissance,
          refExtrait,
          numPiece,
          provenance,
          nomPere,
          profession,
          contactPere,
          nomMere,
          professionMere,
          contactMere,
          receiveValueTypeEleve,
          receiveIdCharge,
          halakat,
          numeroLit,
          batiment,
          dateInscription,
          selectId,
          valueNiveauEtude,
          valueCoranEleve,
          receiveEditId,
          selectNationaliteId,
          selectChambreId
        })
      );

      if (updateEleve.fulfilled.match(result)) {
        await dispatch(getEleves());
        handleClose();
        toast.success(`${result?.payload?.message} `);
        setBatiment('');
        setDescription('');
        setNmbrpersonnedansChambre('');
      }
    }
  };

  useEffect(() => {
    if (valueEdition === 'editer' && receiveEditId) {
      dispatch(getEleve(receiveEditId));
    } else {
      setBatiment('');
      setDescription('');
      setNmbrpersonnedansChambre('');
    }
  }, [valueEdition, receiveEditId, dispatch]);

  useEffect(() => {
    if (valueEdition === 'editer' && eleve) {
      setBatiment(eleve?.strElenumbat);
      setNom(eleve?.strElenom);
      setPrenom(eleve?.strEleprenom);
      setDteNaissance(eleve?.dtElenaissance);
      setLieuNaissance(eleve?.strElelieunaissance);
      setRefExtrait(eleve?.strElerefextrait);
      setNumPiece(eleve?.strElenumpiece);
      setNomPere(eleve?.strElenompere);
      setProfession(eleve?.strEleprofesionpere);
      setContactPere(eleve?.strElecontactpere);
      setNomMere(eleve?.strElenommere);
      setProfessionMere(eleve?.strEleprofesionmere);
      setContactMere(eleve?.strElecontactmere);
      setHalakat(eleve?.strElehalaqate);
      setNumeroLit(eleve?.strElenumlit);
      setDateInscription(eleve?.dtEleinscription);
      setReceiveValueSexe(eleve?.strElesexe);
      setValueCoranEleve(eleve?.strElecoran);
      setValueNiveauEtude(eleve?.strEleniveau);
      setReceiveValueTypeEleve(eleve?.strEleniveau);
      setProvenance(eleve?.strEleprovenance);
      setSelectNationaliteId(eleve?.strEleprovenance);
      setReceiveIdCharge(eleve?.strElepriseencharge);
      setSelectChambreId(eleve?.lgChaid);
      setSelectNationaliteId(eleve?.strElenationalite);
    }
  }, [eleve, valueEdition]);

  const LG_TYLID = '15101410565965462835';

  useEffect(() => {
    dispatch(getListes(LG_TYLID));
    dispatch(getChambres());
  }, []);

  return {
    handleSubmit,
    batiment,
    setBatiment,
    nom,
    setNom,
    prenom,
    setPrenom,
    dteNaissance,
    setDteNaissance,
    lieuNaissance,
    setLieuNaissance,
    refExtrait,
    setRefExtrait,
    numPiece,
    setNumPiece,
    nomPere,
    setNomPere,
    profession,
    setProfession,
    contactPere,
    setContactPere,
    nomMere,
    setNomMere,
    professionMere,
    setProfessionMere,
    contactMere,
    setContactMere,
    halakat,
    setHalakat,
    numeroLit,
    setNumeroLit,
    dateInscription,
    setDateInscription,
    selectId,
    setSelectId,
    createLoading,
    createError,
    valueEdition,
    user,
    sexe,
    receiveValueSexe,
    setReceiveValueSexe,
    priseCharge,
    receiveIdCharge,
    setReceiveIdCharge,
    typeEleve,
    setReceiveValueTypeEleve,
    receiveValueTypeEleve,
    coranEleve,
    valueCoranEleve,
    setValueCoranEleve,
    niveauEleve,
    valueNiveauEtude,
    setValueNiveauEtude,
    setProvenance,
    provenance,
    listNationalite,
    listChambres,
    setSelectChambreId,
    selectChambreId,
    setSelectNationaliteId,
    selectNationaliteId
  };
}
