/**
 * Asynchronously loads the component for each Pages
 */
import Loadable from 'react-loadable';
// import LoadingIndicator from 'components/LoadingIndicator';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
  // loading: LoadingIndicator,
});
