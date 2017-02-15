import React from 'react';
import Helmet from 'react-helmet';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    margin: '5em',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const NotFound = () => (
  <div className={css(styles.container)}>
    <Helmet title="Not Found" />
    <h1>{'Oh, now you\'re lost'}</h1>
  </div>
);

export default NotFound;
