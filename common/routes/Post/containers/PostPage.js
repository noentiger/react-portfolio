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
import { AppConstants } from '../../../constants';

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

const PostPage = ({ title, subtitle, picture, tags, description, slug, isLoading, error }) => {
  if (!error) {
    return (
      <section className={css(styles.container)}>
        <Helmet
          title={title}
          meta={[
              { property: 'og:title', content: title },
              { property: 'og:image', content: `${AppConstants.url}${picture}` },
              { property: 'og:site_name', content: title },
              { property: 'og:url', content: `${AppConstants.url}/post/${slug}` },
              { property: 'og:type', content: 'article' },
              { property: 'og:description', content: description },
              { name: 'description', content: AppConstants.description },
          ]}
          script={[
            {
              type: 'application/ld+json',
              innerHTML: `{
                  "@context": "http://schema.org",
                  "@type": "CreativeWork",
                  "url": "${AppConstants.url}",
                  "image": "${AppConstants.url}${picture}",
                  "producer": "${AppConstants.name}"
                }`,
            },
          ]}
        />
        <Loading loading={isLoading} />
        {!isLoading &&
        <Card
          tags={tags}
          title={title}
          subtitle={subtitle}
          picture={picture}
          description={description}
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
  slug: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(React.PropTypes.string),
  description: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([React.PropTypes.oneOf([null]), PropTypes.any]),
};

PostPage.defaultProps = {
  error: null,
  tags: [],
};

export default provideHooks(redial)(connect(mapStateToProps)(PostPage));
