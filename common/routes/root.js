import App from '../components/App';
import Posts from './Posts';
import Post from './Post';
import NotFound from './NotFound';

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

export default function createRoutes(store) {
  const root = {
    path: '/',
    component: App,
    getChildRoutes(location, cb) {
      require.ensure([], () => {
        cb(null, [
          Post(store),
          NotFound,
        ]);
      });
    },
    getIndexRoute(partialNextState, cb) {
      cb(null, [
        Posts(store),
      ]);
    },

  };

  return root;
}
