/* eslint-disable prettier/prettier */
import React from 'react';
import ListeEleve from './components/ListeEleve';
import Container from '../../../components/Container';

export default function ListeEleves() {
  const title = 'Liste des élèves';
  return (
    <div>
      <Container TitlePage={title}>
        <ListeEleve />
      </Container>
    </div>
  );
}
