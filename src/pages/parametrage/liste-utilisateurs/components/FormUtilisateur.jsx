import React, { useState, useEffect } from 'react';
import { createUtilisateur, getUtilisateur, updateUtilisateur, getUtilisateurs } from '../../../../service/parametrage/utilisateurs';
import { useDispatch, useSelector } from 'react-redux';
import { setEdition } from '../../../../store/parametrage/utilisateur';
import Select from 'react-select';
import { getEcoles } from '../../../../service/parametrage/ecole';

export default function FormUtilisateur({ handleClose }) {
  const dispatch = useDispatch();
  const { createLoading, createError, receiveEditId, valueEdition, utilisateur, receiveId, listeEcoles } = useSelector(
    (state) => state.utilisateur
  );

  const [nameUser, setNameUser] = useState('');
  const [loginUser, setLoginUser] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectId, setSelectId] = useState('');

  const handleSubmit = async () => {
    if (!nameUser.trim() || !loginUser.trim() || !password.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    if (valueEdition === '') {
      const result = await dispatch(createUtilisateur({ nameUser, loginUser, password, email, phone, selectId }));

      if (createUtilisateur.fulfilled.match(result)) {
        await dispatch(getUtilisateurs());
        handleClose();
        setNameUser('');
        setLoginUser('');
        setPassword('');
        setEmail('');
        setPhone('');
      }
    } else if (valueEdition === 'editer') {
      const result = await dispatch(updateUtilisateur({ nameUser, loginUser, password, email, phone, receiveId, selectId }));

      if (updateUtilisateur.fulfilled.match(result)) {
        await dispatch(getUtilisateurs());
        handleClose();
        setNameUser('');
        setLoginUser('');
        setPassword('');
        setEmail('');
        setPhone('');
      }
    }
  };

  useEffect(() => {
    if (valueEdition === 'editer' && receiveEditId) {
      dispatch(getUtilisateur(receiveEditId));
    } else {
      setNameUser('');
      setLoginUser('');
      setPassword('');
      setEmail('');
      setPhone('');
    }
  }, [valueEdition, receiveEditId, dispatch]);

  useEffect(() => {
    if (valueEdition === 'editer' && utilisateur) {
      setNameUser(utilisateur.strUtiname || '');
      setLoginUser(utilisateur.strUtilogin || '');
      setEmail(utilisateur.strUtimail || '');
      setPhone(utilisateur.strUtiphone || '');
      setPassword('****');
    }
  }, [utilisateur, valueEdition]);

  useEffect(() => {
    dispatch(getEcoles());
  }, []);

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
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="phone" className="form-label fw-bold">
              Ecole
            </label>
            <Select
              options={listeEcoles}
              value={listeEcoles?.label}
              onChange={(option) => {
                setSelectId(option ? option.value : '');
              }}
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
