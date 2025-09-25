/* eslint-disable prettier/prettier */
import React from 'react';
import { setEdition } from '../../../../store/parametrage/chambre';
import Select from 'react-select';
import useFormUser from './useFormEnseignants';

export default function FormUtilisateur({ handleClose }) {
  const {
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
            <label htmlFor="nom" className="form-label fw-bold">
              Nom
            </label>
            <input
              type="text"
              className="form-control"
              id="nom"
              placeholder="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="prenom" className="form-label fw-bold">
              Prénoms
            </label>
            <input
              type="text"
              className="form-control"
              id="prenom"
              placeholder="Prénoms"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="phone" className="form-label fw-bold">
              Sexe
            </label>
            <Select
              options={sexe}
              value={sexe.find((s) => s.value === receiveValueSexe)}
              onChange={(option) => {
                console.log({ option });

                setReceiveValueSexe(option ? option.value : '');
              }}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="dateNaissance" className="form-label fw-bold">
              Date de naissance
            </label>
            <input
              type="date"
              className="form-control"
              id="dteNaissance"
              placeholder="Date de aissance"
              value={dteNaissance}
              onChange={(e) => setDteNaissance(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="text" className="form-label fw-bold">
              Lieu de naissance
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              placeholder="Lieu de naissance"
              value={lieuNaissance}
              onChange={(e) => setLieuNaissance(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="text" className="form-label fw-bold">
              Référence extrait
            </label>
            <input
              type="text"
              className="form-control"
              id="text"
              placeholder="Référence extrait"
              value={refExtrait}
              onChange={(e) => setRefExtrait(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="text" className="form-label fw-bold">
              Numéro pièce
            </label>
            <input
              type="text"
              className="form-control"
              id="text"
              placeholder="Numéro pièce"
              value={numPiece}
              onChange={(e) => setNumPiece(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="phone" className="form-label fw-bold">
              Nationalité
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
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="phone" className="form-label fw-bold">
              Provénance
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
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="text" className="form-label fw-bold">
              Nom du père
            </label>
            <input
              type="text"
              className="form-control"
              id="text"
              placeholder="Nom du père"
              value={nomPere}
              onChange={(e) => setNomPere(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="text" className="form-label fw-bold">
              profession
            </label>
            <input
              type="text"
              className="form-control"
              id="text"
              placeholder="profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="text" className="form-label fw-bold">
              Contact du pére
            </label>
            <input
              type="text"
              className="form-control"
              id="text"
              placeholder="Contact du pére"
              value={contactPere}
              onChange={(e) => setContactPere(e.target.value)}
              disabled={createLoading}
            />
          </div>

          {/*  */}
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="text" className="form-label fw-bold">
              Nom de la mère
            </label>
            <input
              type="text"
              className="form-control"
              id="text"
              placeholder="Nom de la mère"
              value={nomMere}
              onChange={(e) => setNomMere(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="text" className="form-label fw-bold">
              profession de la mére
            </label>
            <input
              type="text"
              className="form-control"
              id="text"
              placeholder="profession de la mére"
              value={professionMere}
              onChange={(e) => setProfessionMere(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="text" className="form-label fw-bold">
              Contact de la mère
            </label>
            <input
              type="text"
              className="form-control"
              id="text"
              placeholder="Contact de la mère"
              value={contactMere}
              onChange={(e) => setContactMere(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="phone" className="form-label fw-bold">
              Type d'élève
            </label>
            <Select
              options={typeEleve}
              value={typeEleve.find((option) => option.value === receiveValueTypeEleve)}
              onChange={(option) => {
                setReceiveValueTypeEleve(option ? option.value : '');
              }}
              isDisabled={user === '01' ? false : true}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="phone" className="form-label fw-bold">
              Prise en charge
            </label>
            <Select
              options={priseCharge}
              value={priseCharge.find((option) => option.value === receiveIdCharge)}
              onChange={(option) => {
                setReceiveIdCharge(option ? option.value : '');
              }}
              isDisabled={user === '01' ? false : true}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="phone" className="form-label fw-bold">
              Enseignant
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

          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="text" className="form-label fw-bold">
              Halakat
            </label>
            <input
              type="text"
              className="form-control"
              id="text"
              placeholder="Halakat"
              value={halakat}
              onChange={(e) => setHalakat(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="phone" className="form-label fw-bold">
              Chambre
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

          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="text" className="form-label fw-bold">
              Numéro du lit
            </label>
            <input
              type="text"
              className="form-control"
              id="text"
              placeholder="Numéro du lit"
              value={numeroLit}
              onChange={(e) => setNumeroLit(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="text" className="form-label fw-bold">
              Batiment
            </label>
            <input
              type="text"
              className="form-control"
              id="text"
              placeholder="Batiment"
              value={batiment}
              onChange={(e) => setBatiment(e.target.value)}
              disabled={createLoading}
            />
          </div>

          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="date" className="form-label fw-bold">
              date d'inscription
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              placeholder="date d'inscription"
              value={dateInscription}
              onChange={(e) => setDateInscription(e.target.value)}
              disabled={createLoading}
            />
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="phone" className="form-label fw-bold">
              Niveau de l'élève
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
          <div className="col-md-6 col-lg-6 col-sm-12 mb-3">
            <label htmlFor="phone" className="form-label fw-bold">
              Coran
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

          {/*  */}
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
