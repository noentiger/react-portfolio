import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Color } from '../style';

const styles = StyleSheet.create({
  category: {
    display: 'inline-block',
    marginRight: '1em',
    background: Color.grayDark,
    padding: '10px 15px',
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '1em',
  },
});

const Tags = ({ tags }) => (
  <article className={css(styles.container)}>
    {tags.map(tag =>
      <span key={tag} className={css(styles.category)}>{tag.toUpperCase()}</span>,
    )}
  </article>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(React.PropTypes.string),
};

Tags.defaultProps = {
  tags: [],
};

export default Tags;
