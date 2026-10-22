import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { withProviders } from './app/providers';

function App() {
  return <RouterProvider router={router} />;
}

export default withProviders(App);
