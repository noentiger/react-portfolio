import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { loadPost } from '../actions';
import NotFound from '../../../components/NotFound';
import { selectCurrentPost } from '../reducer';
import Card from '../../../components/Card';
import Loading from '../../../components/Loading';

const redial = {
  fetch: ({ dispatch, params: { slug } }) => dispatch(loadPost(slug)),
};

const mapStateToProps = state => selectCurrentPost(state);

const styles = StyleSheet.create({
  loading: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    minMeight: '100vh',
    margin: '0 auto',
  },
});

const PostPage = ({ title, subtitle, picture, tags, content, isLoading, error }) => {
  if (!error) {
    return (
      <section className={css(styles.container)}>
        <Helmet title={title} />
        <Loading loading={isLoading} />
        {!isLoading &&
        <Card
          tags={tags}
          title={title}
          subtitle={subtitle}
          picture={picture}
          content={content}
          large
        />}
      </section>
    );
  }
    // maybe check for different types of errors and display appropriately
  return <NotFound />;
};

PostPage.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(React.PropTypes.string),
  content: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool,
};

PostPage.defaultProps = {
  error: false,
  tags: [],
};

export default provideHooks(redial)(connect(mapStateToProps)(PostPage));
