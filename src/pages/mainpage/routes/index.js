import App from '../containers/App';
import FirstPage from '../containers/FirstPage';
import Blog from '../components/Blog/Blog';
import Experiment from '../components/Experiment/Experiment';
const routes = {
  path: '/',
  component: App,
  indexRoute: { component: FirstPage },
  childRoutes: [
    {
      path: 'blog',
      component: Blog
    },
    {
      path: 'experiment',
      component: Experiment
    }
  ]
};
export default routes;
