import { injectAsyncReducer } from '../../store';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes(store) {
  return {
    getComponents(location, cb) {
      require.ensure([
        './containers/Posts',
        './reducer',
      ], (require) => {
        const PostPage = require('./containers/Posts').default;
        const postReducer = require('./reducer').default;
        injectAsyncReducer(store, 'posts', postReducer);
        cb(null, PostPage);
      });
    },
  };
}
