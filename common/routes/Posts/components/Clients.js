import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Color } from '../../../style';

const styles = StyleSheet.create({
  container: {
    margin: '4em auto',
  },
  title: {
    color: Color.black,
    fontWeight: 900,
    fontSize: 56,
    maxWidth: 600,
  },
  item: {
    color: Color.black,
    fontWeight: 300,
    display: 'inline-block',
    padding: '10px 5px',
    wordBreak: 'break-all',
    '@media (min-width: 320px) and (max-width: 1224px)': {
      fontSize: 21,
    },
    '@media (min-width: 1224px)': {
      fontSize: 36,
    },
  },
});

const Clients = () => (
  <div className={css(styles.container)}>
    <h1 className={css(styles.title)}>{'Some of the clients I\'ve worked with'}</h1>
    {
        /* eslint-disable no-use-before-define */
        clientList.map((client, i) =>
          <h4 key={client.name} className={css(styles.item)}>{client.name} {i !== clientList.length - 1 && '/'}</h4>,
        )
        /* eslint-enable no-use-before-define */
    }
  </div>
);

const clientList = [
  {
    name: 'Arla',
  },
  {
    name: 'Skånemejerier',
  },
  {
    name: 'SATS Elixia',
  },
  {
    name: 'Aller Media',
  },
  {
    name: 'Apollo',
  },
  {
    name: 'PwC',
  },
  {
    name: 'C Sports',
  },
  {
    name: 'Choice Hotels',
  },
  {
    name: 'Blocket',
  },
  {
    name: 'Hästens',
  },
  {
    name: "McDonald's",
  },
  {
    name: 'Intersport',
  },
  {
    name: 'Opel',
  },
  {
    name: 'Pepsi',
  },
  {
    name: 'Dressmann',
  },
  {
    name: 'SVT',
  },
  {
    name: 'Tele2',
  },
  {
    name: 'Aftenposten',
  },
  {
    name: 'Pizza Hut',
  },
  {
    name: 'Goldwell',
  },
  {
    name: 'Svensk Fastighetsförmedling',
  },
  {
    name: 'Trocadero',
  },
  {
    name: 'Babyshop',
  },
  {
    name: 'Happy Pancake',
  },
  {
    name: 'Aunt Mabels',
  },
  {
    name: 'First Hotels',
  },
  {
    name: 'Proteinfabrikken',
  },
  {
    name: 'Peppes Pizza',
  },
  {
    name: 'Sparebank1',
  },
  {
    name: 'Actic Träning',
  },
  {
    name: 'Physio Control',
  },
  {
    name: 'VG',
  },
  {
    name: 'Norges Golfforbund',
  },
  {
    name: 'Helsingborgs IF',
  },
  {
    name: 'Eika',
  },
  {
    name: 'Amesto',
  },
  {
    name: 'Länsförsäkringar Stockholm',
  },
  {
    name: 'Humac',
  },
  {
    name: 'Yellow Pages',
  },
  {
    name: 'Godfisk',
  },
  {
    name: 'Radio P4',
  },
  {
    name: 'Visit Sweden',
  },
  {
    name: 'Stamina',
  },
];

export default Clients;
