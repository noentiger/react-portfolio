import React, { PropTypes } from 'react';
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

const NavLink = ({ title, link }) => (
  <a href={link} rel="noopener noreferrer" className={css(styles.link)}>{title}</a>
);

NavLink.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default NavLink;
