import React from 'react';
import IndexLink from 'react-router/lib/IndexLink';
import { StyleSheet, css } from 'aphrodite';
import { Color } from '../style';

const styles = StyleSheet.create({
  header: {
    textDecoration: 'none',
    marginBottom: 50,
    display: 'block',
  },
  title: {
    color: Color.black,
    maxWidth: 300,
    fontWeight: 900,
    fontSize: 56,
  },
  subtitle: {
    color: Color.black,
    fontWeight: 900,
    fontSize: 42,
    background: Color.grayLighter,
    display: 'inline-block',
    padding: '.5rem',
  },
});

const Header = () => (
  <IndexLink to="/" className={css(styles.header)}>
    <h1 className={css(styles.title)}>Hello,</h1>
    <h1 className={css(styles.title)}>I am Kim</h1>
    <h1 className={css(styles.subtitle)}>I am a Passion-driven Tech Entrepreneur</h1>
  </IndexLink>
);

export default Header;
