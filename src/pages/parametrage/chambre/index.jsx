/* eslint-disable prettier/prettier */
import React from 'react';
import ListeChambre from './components/ListeChambre';
import Container from '../../../components/Container';

export default function ListeChambres() {
  const title = 'Liste des chambres';
  return (
    <div>
      <Container TitlePage={title}>
        <ListeChambre />
      </Container>
    </div>
  );
}
