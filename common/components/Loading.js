import React, { PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Color } from '../style';

const styles = StyleSheet.create({
  container: {
    margin: '5em',
  },
  loading: {
    fontWeight: 300,
    fontSize: 56,
    color: Color.grayLight,
  },
});

const Loading = ({ loading }) => {
  if (loading) {
    return (<div className={css(styles.container)}>
      <h2 className={css(styles.loading)}>Loading....</h2>
    </div>);
  }
  return false;
};

Loading.propTypes = {
  loading: PropTypes.bool,
};

Loading.defaultProps = {
  loading: false,
};

export default Loading;
