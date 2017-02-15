import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link } from 'react-router';
import { Color } from '../style';
import Tags from './Tags';

const styles = StyleSheet.create({
  thumbnail: {
    background: Color.black,
    height: '575px',
    overflow: 'hidden',
  },
  thumbnailLarge: {
    height: 'auto',
  },
  image: {
    display: 'block',
    width: '100%',
    transition: 'all 0.3s linear 0s',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    background: Color.white,
    width: '100%',
    padding: '30px',
    boxSizing: 'border-box',
    transition: 'all 0.3s cubic-bezier(0.37, 0.75, 0.61, 1.05) 0s',
  },
  contentLarge: {
    position: 'relative',
  },
  title: {
    margin: 0,
    padding: '0 0 10px',
    color: Color.grayDark,
    fontSize: '26px',
    fontWeight: 700,
  },
  subtitle: {
    margin: 0,
    padding: '0 0 20px',
    color: '#333333',
    fontSize: '20px',
    fontWeight: 400,
  },
  description: {
    color: Color.gray,
    fontSize: 24,
    fontWeight: 300,
    whiteSpace: 'pre-line',
  },
  cardContainer: {
    position: 'relative',
    flexBasis: 'calc(480px + 20px)',
    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s linear 0s',
    textDecoration: 'none',
    margin: '1em auto',
    ':hover': {
      boxShadow: '0px 1px 35px 0px rgba(0, 0, 0, 0.3)',
    },
  },
  cardContainerLarge: {
    flexBasis: 'calc(680px + 20px)',
    pointerEvents: 'none',
  },
});

const Card = ({ tags, title, subtitle, slug, picture, content, large }) => (
  <Link
    to={`/post/${slug}`}
    className={css(styles.cardContainer, large && styles.cardContainerLarge)}
  >
    <div className={css(styles.thumbnail, large && styles.thumbnailLarge)}>
      <img alt={title} className={css(styles.image)} src={picture} />
    </div>
    <div className={css(styles.content, large && styles.contentLarge)}>
      <h1 className={css(styles.title)}>{title}</h1>
      <h2 className={css(styles.subtitle)}>{subtitle}</h2>
      {large && <p className={css(styles.description)}>{content}</p>}
      <Tags tags={tags} />
    </div>
  </Link>
);

Card.propTypes = {
  tags: PropTypes.arrayOf(React.PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  slug: PropTypes.string,
  content: PropTypes.string,
  large: PropTypes.bool,
};

Card.defaultProps = {
  content: '',
  large: false,
  slug: '',
};

export default Card;
