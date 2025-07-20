import React, { useState } from 'react';
import { createUtilisateur, getUtilisateur, updateUtilisateur, getUtilisateurs } from '../../../../service/parametrage/utilisateurs';
import { useDispatch, useSelector } from 'react-redux';
import { setEdition } from '../../../../store/parametrage/utilisateur';

export default function FormUtilisateur({ handleClose }) {
  const dispatch = useDispatch();
  const { createLoading, createError, receiveEditId, valueEdition } = useSelector((state) => state.utilisateur);
  const [nameUser, setNameUser] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!nameUser.trim() || !loginUser.trim() || !password.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    if (valueEdition === '') {
      dispatch(createUtilisateur({ nameUser, loginUser, password }));
      dispatch(getUtilisateurs());
      handleClose();
      setNameUser('');
      setLoginUser('');
      setPassword('');
    } else if (valueEdition === 'editer') {
      dispatch(updateUtilisateur({ nameUser, loginUser, password }));
    }
  };

  React.useEffect(() => {
    if (valueEdition === 'editer') {
      dispatch(getUtilisateur(receiveEditId));
    }

    if (!createLoading && !createError) {
      setNameUser('');
      setLoginUser('');
      setPassword('');
    }
  }, [createLoading, createError]);

  return (
    <div>
      <div className="container-fluid">
        {/* Affichage des erreurs */}
        {createError && (
          <div className="alert alert-danger mb-3" role="alert">
            Erreur lors de la création : {createError}
          </div>
        )}

        <div className="row" style={{ marginTop: 125 }}>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="user" className="form-label fw-bold">
              Nom utilisateur
            </label>
            <input
              type="text"
              className="form-control"
              id="user"
              placeholder="Nom utilisateur"
              value={nameUser}
              onChange={(e) => setNameUser(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="login" className="form-label fw-bold">
              Login
            </label>
            <input
              type="text"
              className="form-control"
              id="login"
              placeholder="login"
              value={loginUser}
              onChange={(e) => setLoginUser(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="password" className="form-label fw-bold">
              Mot de Passe
            </label>
            <input
              type="text"
              className="form-control"
              id="password"
              placeholder="Mot de Passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={createLoading}
            />
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="row mt-3">
          <div className="col-12">
            <div className="d-flex justify-content-end gap-2">
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
