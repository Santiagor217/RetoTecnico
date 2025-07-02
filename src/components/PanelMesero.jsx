import { useEffect, useState } from 'react';

export default function PanelMesero() {
  const [mesas, setMesas] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

  const cargarMesas = () => {
    fetch('http://localhost:3001/mesas')
      .then((res) => res.json())
      .then((data) => setMesas(data));
  };

  useEffect(() => {
    cargarMesas();
  }, []);

  const cambiarEstado = (id, nuevoEstado) => {
    fetch(`http://localhost:3001/mesas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado })
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al actualizar el estado de la mesa');
        return res.json();
      })
      .then(() => cargarMesas())
      .catch((err) => alert('Error al actualizar el estado de la mesa'));
  };

  const colorPorEstado = (estado) => {
    switch (estado) {
      case 'disponible': return 'bg-green-200';
      case 'reservada': return 'bg-yellow-200';
      case 'ocupada': return 'bg-red-300';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Gestión de Mesas</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {mesas.map((mesa) => (
          <div
            key={mesa.id}
            className={`p-4 rounded-lg text-center cursor-pointer border ${colorPorEstado(mesa.estado)}`}
            onClick={() => setMesaSeleccionada(mesa)}
          >
            <p className="font-semibold">Mesa {mesa.numero}</p>
            <p className="text-sm">{mesa.estado}</p>
          </div>
        ))}
      </div>

      {mesaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-bold mb-2">Cambiar estado de Mesa {mesaSeleccionada.numero}</h3>
            <div className="space-x-2">
              <button
                onClick={() => {
                  cambiarEstado(mesaSeleccionada.id, 'disponible');
                  setMesaSeleccionada(null);
                }}
                className="px-3 py-1 bg-green-400 rounded text-white"
              >
                Libre
              </button>
              <button
                onClick={() => {
                  cambiarEstado(mesaSeleccionada.id, 'reservada');
                  setMesaSeleccionada(null);
                }}
                className="px-3 py-1 bg-yellow-400 rounded"
              >
                Reservada
              </button>
              <button
                onClick={() => {
                  cambiarEstado(mesaSeleccionada.id, 'ocupada');
                  setMesaSeleccionada(null);
                }}
                className="px-3 py-1 bg-red-500 rounded text-white"
              >
                Ocupada
              </button>
              <button
                onClick={() => setMesaSeleccionada(null)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
