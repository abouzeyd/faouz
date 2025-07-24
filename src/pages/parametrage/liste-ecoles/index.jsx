/* eslint-disable prettier/prettier */
import React from 'react';
import ListeEcole from './components/ListeEcole';
import Container from '../../../components/Container';

export default function ListeUtilisateurs() {
  const title = 'Liste des Ecoles';
  return (
    <div>
      <Container TitlePage={title}>
        <ListeEcole />
      </Container>
    </div>
  );
}
