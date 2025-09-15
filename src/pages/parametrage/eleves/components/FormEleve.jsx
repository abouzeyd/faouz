/* eslint-disable prettier/prettier */
import React from 'react';
import { setEdition } from '../../../../store/parametrage/utilisateur';
import Select from 'react-select';
import useFormEleve from './useFormEleve';

export default function FormUtilisateur({ handleClose }) {
  const {
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
  } = useFormEleve({ handleClose });

  return (
    <div>
      <div className="container-fluid">
        {/* Affichage des erreurs */}
        {createError && (
          <div className="alert alert-danger mb-3" role="alert">
            Erreur lors de la création : {createError}
          </div>
        )}

        <div className="row" style={{ marginTop: 60, paddingLeft: 40, paddingRight: 40 }}>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="batiment" className="form-label fw-bold">
              Nom
            </label>
            <input
              type="text"
              className="form-control"
              id="nom"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="description" className="form-label fw-bold">
              Prénom
            </label>
            <input
              type="text"
              className="form-control"
              id="prenom"
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="numparent" className="form-label fw-bold">
              Numéro parent
            </label>
            <input
              type="text"
              className="form-control"
              id="numparent"
              placeholder="Numéro parent"
              value={numeroParent}
              onChange={(e) => setNumeroParent(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="text" className="form-label fw-bold">
              Date de naissance
            </label>
            <input
              type="date"
              className="form-control"
              id="text"
              placeholder="Nombre de personne dans la chambre"
              value={selectTypeEleveId}
              onChange={(e) => setSelectTypeEleveId(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="phone" className="form-label fw-bold">
              Type d'élève
            </label>
            <Select
              options={listeEcoles}
              value={listeEcoles.find((option) => option.value === selectTypeEleveId)}
              onChange={(option) => {
                setSelectTypeEleveId(option ? option.value : '');
              }}
              isDisabled={user === '01' ? false : true}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="phone" className="form-label fw-bold">
              Genre
            </label>
            <Select
              options={listeEcoles}
              value={listeEcoles.find((option) => option.value === selectGenreEleveId)}
              onChange={(option) => {
                setSelectGenreEleveId(option ? option.value : '');
              }}
              isDisabled={user === '01' ? false : true}
            />
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="row mt-3">
          <div className="col-12">
            <div className="d-flex justify-content-end gap-2" style={{ paddingLeft: 40, paddingRight: 40 }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  handleClose();
                  dispatch(setEdition(''));
                }}
                disabled={createLoading}
              >
                Annuler
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={createLoading}>
                {createLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Enregistrement...
                  </>
                ) : valueEdition === 'editer' ? (
                  'Modifier'
                ) : valueEdition === 'voir' ? (
                  'Visualiser'
                ) : (
                  'Enregistrer'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
