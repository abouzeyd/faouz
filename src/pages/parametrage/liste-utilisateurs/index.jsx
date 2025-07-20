/* eslint-disable prettier/prettier */
import React from 'react';
import ListeUseurs from './components/ListeUseurs';
import Container from '../../../components/Container';

export default function ListeUtilisateurs() {
  const title = 'Liste des Utilisateurs';
  return (
    <div>
      <Container TitlePage={title}>
        <ListeUseurs />
      </Container>
    </div>
  );
}
