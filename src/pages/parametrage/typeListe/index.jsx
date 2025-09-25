/* eslint-disable prettier/prettier */
import React from 'react';
import TypeListe from './components/TypeListe';
import Container from '../../../components/Container';

export default function ListeProfil() {
  const title = 'Type liste';
  return (
    <div>
      <Container TitlePage={title}>
        <TypeListe />
      </Container>
    </div>
  );
}
