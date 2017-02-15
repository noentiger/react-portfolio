import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Color } from '../style';

const styles = StyleSheet.create({
  link: {
    color: Color.grayLight,
    textDecoration: 'none',
    margin: '1rem 1rem 0 0',
    display: 'inline-block',
    fontSize: 24,
    fontWeight: 'bold',
    transition: '.2s opacity ease',
    ':hover': {
      opacity: 0.6,
    },
  },
  activeLink: {
    color: Color.black,
  },
});

const Nav = () => (
  <div>
    <a href="mailto:kim.wijk@gmail.com" rel="noopener noreferrer" className={css(styles.link)}>E-mail</a>
    <a href="https://github.com/noentiger" rel="noopener noreferrer" className={css(styles.link)} target="_blank">GitHub</a>
    <a href="https://medium.com/@kimwijk" rel="noopener noreferrer" className={css(styles.link)} target="_blank">Medium</a>
    <a href="https://www.linkedin.com/in/kimwijk" rel="noopener noreferrer" className={css(styles.link)} target="_blank">LinkedIn</a>
  </div>
);

export default Nav;
