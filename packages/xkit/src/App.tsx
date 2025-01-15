import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routeConfig } from './router';

function App() {
  return <RouterProvider router={createBrowserRouter(routeConfig)} />;
}

export default App;
