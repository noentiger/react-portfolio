import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { StyleSheet, css } from 'aphrodite';
import Nav from './Nav';
import Header from './Header';
import { Color } from '../style';

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
      title="Kim Wijk – A Portfolio of a Passion-driven Tech Entrepreneur"
      meta={[
          { property: 'og:title', content: 'Kim Wijk – A Portfolio of a Passion-driven Tech Entrepreneur' },
          { property: 'og:image', content: 'http://kimwijk.com/media/profile-picture.jpg' },
          { property: 'og:site_name', content: 'Kim Wijk – A Portfolio of a Passion-driven Tech Entrepreneur' },
          { property: 'og:url', content: 'http://kimwijk.com' },
          { property: 'og:type', content: 'article' },
          { property: 'og:description', content: 'I am a passion-driven Tech Entrepreneur' },
      ]}
      script={[
        {
          type: 'application/ld+json',
          innerHTML: `{
              "@context": "http://schema.org",
              "@type": "WebSite",
              "url": "http://www.kimwijk.com",
              "accountablePerson": "Kim Wijk",
              "image": "http://kimwijk.com/media/profile-picture.jpg",
              "workExample": "Startups, Apps, Design, Entrepreneurship",
              "description": "I am a Passion-driven Tech Entrepreneur",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+46-701622529",
                "contactType": "customer service"
              }}`,
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
