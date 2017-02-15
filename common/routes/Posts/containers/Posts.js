import { provideHooks } from 'redial';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import { loadPosts } from '../actions';
import Card from '../../../components/Card';
import { selectPosts } from '../reducer';
import Loading from '../../../components/Loading';
import Clients from '../components/Clients';

const redial = {
  fetch: ({ dispatch }) => dispatch(loadPosts()),
};

const mapStateToProps = state => ({
  posts: selectPosts(state),
});

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    minMeight: '100vh',
    margin: '0 auto',
  },
});

const Posts = ({ posts }) => (
  <div>
    <div className={css(styles.container)}>
      <Loading loading={posts.isLoading} />
      {!posts.isLoading &&
          posts.data.map(post =>
            <Card
              key={post.id}
              tags={post.tags}
              title={post.title}
              subtitle={post.subtitle}
              picture={post.picture}
              slug={post.slug}
            />,
          )}
    </div>
    <Clients />
  </div>
);

Posts.propTypes = {
  posts: React.PropTypes.shape({
    data: PropTypes.array.isRequired,
    lastFetched: PropTypes.oneOfType([React.PropTypes.oneOf([null]), PropTypes.any]),
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([React.PropTypes.oneOf([null]), PropTypes.any]),
  }),
};

Posts.defaultProps = {
  posts: React.PropTypes.shape({
    data: [],
    lastFetched: null,
    isLoading: false,
    error: null,
  }),
};

export default provideHooks(redial)(connect(mapStateToProps)(Posts));
