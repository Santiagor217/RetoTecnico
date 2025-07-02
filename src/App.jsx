import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormularioReserva from './components/FormularioReserva';
import LoginMesero from './components/LoginMesero';
import PanelMesero from './components/PanelMesero';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormularioReserva />} />
        <Route path="/mesero" element={<LoginMesero />} />
        <Route path="/mesero/panel" element={<PanelMesero />} />
      </Routes>
    </BrowserRouter>
  );
}
