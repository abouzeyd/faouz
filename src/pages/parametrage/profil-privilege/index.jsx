/* eslint-disable prettier/prettier */
import React from 'react';
import ListeProfilPivilege from './components/ListeProfilPivilege';
import Container from '../../../components/Container';

export default function ListeProfil() {
  const title = 'Liste des profils et Privilèges';
  return (
    <div>
      <Container TitlePage={title}>
        <ListeProfilPivilege />
      </Container>
    </div>
  );
}
