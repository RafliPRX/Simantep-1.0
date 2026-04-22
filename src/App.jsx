import { useRoutes } from 'react-router-dom'
import './App.css'
import { LoadingProvider } from './component/LoadingContext'

import { routeList } from './routes/routelist';

function App() {
  const element = useRoutes(routeList)
  return (
    <LoadingProvider>
      {element}
    </LoadingProvider>
  );
}

export default App