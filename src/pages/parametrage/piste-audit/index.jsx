/* eslint-disable prettier/prettier */
import React from 'react';
import ListePisteAudit from './components/ListePisteAudit';
import Container from '../../../components/Container';

export default function ListeAudit() {
  const title = "Piste d'audite";
  return (
    <div>
      <Container TitlePage={title}>
        <ListePisteAudit />
      </Container>
    </div>
  );
}
