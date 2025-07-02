import { useState } from 'react';
import PlanoMesas from './PlanoMesas';
import ModalConfirmacion from './ModalConfirmacion';

export default function FormularioReserva() {
  const [fecha, setFecha] = useState('');
  const [huespedes, setHuespedes] = useState(1);
  const [hora, setHora] = useState('');
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [notas, setNotas] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fecha || !hora || !huespedes) {
      alert('Por favor completa todos los campos antes de continuar.');
      return;
    }

    console.log({ fecha, hora, huespedes, mesaSeleccionada, notas });
    setMostrarModal(true);
  };

  return (
    <div className="max-w-xl mx-auto p-6" data-aos="fade-up">
      <h2 className="text-2xl font-bold mb-4 text-center">Reserva tu Mesa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
        <input
          type="number"
          min="1"
          className="w-full p-2 border rounded"
          placeholder="Número de huéspedes"
          value={huespedes}
          onChange={(e) => setHuespedes(parseInt(e.target.value))}
          required
        />
        {huespedes > 6 && (
          <PlanoMesas setMesaSeleccionada={setMesaSeleccionada} />
        )}
        <input
          type="time"
          className="w-full p-2 border rounded"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Notas (opcional)"
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Confirmar Reserva
        </button>
      </form>

      {mostrarModal && (
        <ModalConfirmacion
          fecha={fecha}
          huespedes={huespedes}
          hora={hora}
          mesa={mesaSeleccionada}
          notas={notas}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </div>
  );
}
