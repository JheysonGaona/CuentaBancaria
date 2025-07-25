import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CuentaBancariaLista from './components/CuentaBancariaLista';

function Home() {
  return (
    <div>
      <h1>Bienvenido</h1>
      <Link to="/cuentas">Ir a gestión de cuentas</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuentas" element={<CuentaBancariaLista />} />
      </Routes>
    </Router>
  );
}

export default App;