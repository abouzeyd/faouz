import React from 'react';
import { setEdition } from '../../../../store/parametrage/utilisateur';
import Select from 'react-select';
import useFormEcole from './useFormPisteAudit';

export default function FormUtilisateur({ handleClose }) {
  const {
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
  } = useFormEcole({ handleClose });

  return (
    <div>
      <div className="container-fluid">
        {/* Affichage des erreurs */}
        {createError && (
          <div className="alert alert-danger mb-3" role="alert">
            Erreur lors de la création : {createError}
          </div>
        )}

        <div className="row" style={{ marginTop: 80, paddingLeft: 40, paddingRight: 40 }}>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="nameEcole" className="form-label fw-bold">
              Nom de l'école
            </label>
            <input
              type="text"
              className="form-control"
              id="nameEcole"
              placeholder="Nom de l'école"
              value={nameEcole}
              onChange={(e) => setNameEcole(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="localisation" className="form-label fw-bold">
              Localisation
            </label>
            <input
              type="text"
              className="form-control"
              id="localisation"
              placeholder="Localisation"
              value={localisation}
              onChange={(e) => setLocalisation(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="phone" className="form-label fw-bold">
              Téléphone
            </label>
            <input
              type="text"
              className="form-control"
              id="telephone"
              placeholder="Télephone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={createLoading}
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
