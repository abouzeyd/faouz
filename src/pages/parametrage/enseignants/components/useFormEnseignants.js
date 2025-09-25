/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEcoles } from '../../../../service/parametrage/ecole';
import { getValueLocalStorage } from '../../../../service/globalFunction';
import { getEleves, updateEleve, getEleve, createEleve } from '../../../../service/parametrage/eleves';
import toast from 'react-hot-toast';

export default function useFormUser({ handleClose }) {
  const dispatch = useDispatch();
  const { createLoading, createError, receiveEditId, valueEdition, eleve, receiveId, listeEcoles } = useSelector((state) => state.eleve);
  const user = getValueLocalStorage('user')?.lgUtiid;

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
  const sexe = [
    { label: 'Fille', value: '0' },
    { label: 'Garcon', value: '1' }
  ];

  const [receiveValueSexe, setReceiveValueSexe] = useState('');
  const priseCharge = [
    { label: '', value: '' },
    { label: 'ONG', value: '0' },
    { label: 'PARTICULIER', value: '1' },
    { label: 'FONDATEUR', value: '2' }
  ];

  const typeEleve = [
    { label: '', value: '' },
    { label: 'INTERNE', value: '0' },
    { label: 'EXTERNE', value: '1' }
  ];

  const [receiveValueTypeEleve, setReceiveValueTypeEleve] = useState('');

  const [receiveIdCharge, setReceiveIdCharge] = useState('');
  const [description, setDescription] = useState('');
  const [nmbrpersonnedansChambre, setNmbrpersonnedansChambre] = useState('');
  const [selectId, setSelectId] = useState('');

  console.log({ valueEdition });

  const handleSubmit = async () => {
    if (!batiment.trim() || !description.trim() || !nmbrpersonnedansChambre.trim()) {
    }
    if (valueEdition === '') {
      const result = await dispatch(
        createEleve({
          nom,
          prenom,
          sexe,
          dteNaissance,
          lieuNaissance,
          refExtrait,
          numPiece,
          nomPere,
          profession,
          contactPere,
          nomMere,
          professionMere,
          contactMere,
          receiveValueTypeEleve,
          priseCharge,
          halakat,
          numeroLit,
          batiment,
          dateInscription,
          selectId
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
      const result = await dispatch(updateEleve({ batiment, description, nmbrpersonnedansChambre, receiveId, selectId, receiveEditId }));

      if (updateEleve.fulfilled.match(result)) {
        await dispatch(getEleves());
        handleClose();
        toast.success(`${result?.payload?.message} `);
        setBatiment('');
        setDescription('');
        setNmbrpersonnedansChambre('');
      } else {
        toast.error(`${result?.payload?.message} `);
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
      setBatiment(eleve?.strChanumbat || '');
      setDescription(eleve.strChadescription || '');
      setSelectId(eleve?.lgEcoid);
      setNmbrpersonnedansChambre('***************');
    }
  }, [eleve, valueEdition]);

  useEffect(() => {
    dispatch(getEcoles());
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
    listeEcoles,
    user,
    sexe,
    receiveValueSexe,
    setReceiveValueSexe,
    priseCharge,
    receiveIdCharge,
    setReceiveIdCharge,
    typeEleve,
    setReceiveValueTypeEleve,
    receiveValueTypeEleve
  };
}
