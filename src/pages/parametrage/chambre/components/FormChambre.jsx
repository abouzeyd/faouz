/* eslint-disable prettier/prettier */
import React from 'react';
import { setEdition } from '../../../../store/parametrage/utilisateur';
import Select from 'react-select';
import useFormUser from './useFormChambre';

export default function FormUtilisateur({ handleClose }) {
  const {
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
  } = useFormUser({ handleClose });

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
              Batiment
            </label>
            <input
              type="text"
              className="form-control"
              id="batiment"
              placeholder="Batiment"
              value={batiment}
              onChange={(e) => setBatiment(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="description" className="form-label fw-bold">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={createLoading}
            />
          </div>
          {/* <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="password" className="form-label fw-bold">
              Numéro de lit
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              placeholder="Numéro de lit"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={createLoading}
            />
          </div> */}
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="text" className="form-label fw-bold">
              Nombre de personne dans la chambre
            </label>
            <input
              type="text"
              className="form-control"
              id="text"
              placeholder="Nombre de personne dans la chambre"
              value={nmbrpersonnedansChambre}
              onChange={(e) => setNmbrpersonnedansChambre(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="phone" className="form-label fw-bold">
              Chef de chambre
            </label>
            <Select
              options={listeEcoles}
              value={listeEcoles.find((option) => option.value === selectId)}
              onChange={(option) => {
                setSelectId(option ? option.value : '');
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
