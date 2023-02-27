import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from 'react-router-dom';

import Home from './components/Home'

function App() {
  return <Router>
         <Routes>
         <Route path="/home" element = {<Home/>} />
         <Route path="*" element={<Navigate to="/home"/>} />
         </Routes>
        </Router>
}

export default App;
