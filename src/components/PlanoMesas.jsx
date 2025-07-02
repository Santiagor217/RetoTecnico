import { useEffect, useState } from 'react';

export default function PlanoMesas({ setMesaSeleccionada, refreshTrigger }) {
  const [mesas, setMesas] = useState([]);
  const [mesaActiva, setMesaActiva] = useState(null);

  const cargarMesas = () => {
    fetch('http://localhost:3001/mesas')
      .then((res) => res.json())
      .then((data) => setMesas(data));
  };

  useEffect(() => {
    cargarMesas();
  }, [refreshTrigger]); // <-- vuelve a cargar cuando cambie refreshTrigger

  const seleccionarMesa = (mesa) => {
    if (mesa.estado !== 'disponible') return;
    setMesaActiva(mesa.id);
    setMesaSeleccionada(mesa);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-4" data-aos="fade-in">
      {mesas.map((mesa) => (
        <div
          key={mesa.id}
          onClick={() => seleccionarMesa(mesa)}
          className={`p-4 rounded-lg text-center cursor-pointer border transition-all
            ${mesa.estado === 'ocupada' || mesa.estado === 'reservada'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : mesa.id === mesaActiva
              ? 'bg-green-400 text-white'
              : 'bg-white hover:bg-blue-100 border-blue-400'}`}
        >
          Mesa {mesa.numero} <br />
          <span className="text-xs">({mesa.estado})</span>
        </div>
      ))}
    </div>
  );
}

