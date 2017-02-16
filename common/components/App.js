import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { StyleSheet, css } from 'aphrodite';
import Nav from './Nav';
import Header from './Header';
import { Color } from '../style';
import { AppConstants } from '../constants';

const styles = StyleSheet.create({
  root: {
    color: Color.black,
    margin: '4rem auto',
    '@media (min-width: 320px) and (max-width: 1224px)': {
      padding: '0 1rem',
    },
    '@media (min-width: 1224px)': {
      padding: '0 5rem',
    },
  },
  title: {
    color: Color.black,
    maxWidth: 300,
    fontWeight: 900,
    fontSize: 56,
  },
  footer: {
    margin: '4rem auto',
    textAlign: 'center',
    color: '#b7b7b7',
  },
  footerLink: {
    display: 'inline-block',
    color: Color.black,
    textDecoration: 'none',
  },
});

const App = ({ children }) => (
  <div className={css(styles.root)}>
    <Helmet
      title={AppConstants.title}
      meta={[
          { property: 'og:title', content: AppConstants.title },
          { property: 'og:image', content: AppConstants.profilePicture },
          { property: 'og:site_name', content: AppConstants.title },
          { property: 'og:url', content: AppConstants.url },
          { property: 'og:type', content: 'article' },
          { property: 'og:description', content: AppConstants.description },
          { name: 'description', content: AppConstants.description },
      ]}
      script={[
        {
          type: 'application/ld+json',
          innerHTML: `{
              "@context": "http://schema.org",
              "@type": "Organization",
              "url": "${AppConstants.url}",
              "image": "${AppConstants.profilePicture}",
              "description": "${AppConstants.description}",
              "email": "${AppConstants.email}",
              "mainEntityOfPage": {
                "@type": "CreativeWork"
              },
              "alumni": [
                {
                  "@type": "Person",
                  "name": "${AppConstants.name}",
                  "email": "${AppConstants.email}",
                  "telephone": "${AppConstants.phoneNumber}",
                  "jobTitle": "${AppConstants.jobTitle}",
                  "description": "${AppConstants.description}"
                }
              ]
          }`,
        },
      ]}
    />
    <Header />
    {children}
    <h1 className={css(styles.title)}>{'You\'ll find me here'}</h1>
    <Nav />
    <footer className={css(styles.footer)} />
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
