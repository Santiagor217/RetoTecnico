export default function ModalConfirmacion({ fecha, huespedes, hora, mesa, notas, onClose }) {
  const handleConfirmar = async () => {
    const numeroMesa = mesa?.numero || 'Sin asignar';

    const nuevaReserva = {
      fecha,
      huespedes,
      hora,
      mesa: numeroMesa,
      notas
    };

    try {
      // 1. Guardar la reserva
      const resReserva = await fetch('http://localhost:3001/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaReserva)
      });

      if (!resReserva.ok) throw new Error('Error al guardar la reserva');
      const dataReserva = await resReserva.json();
      console.log('Reserva guardada:', dataReserva);

      // 2. Actualizar estado de la mesa
      if (mesa && mesa.id) {
        const resMesa = await fetch(`http://localhost:3001/mesas/${mesa.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ estado: 'reservada' })
        });

        if (!resMesa.ok) throw new Error('Error al actualizar estado de mesa');
        const dataMesa = await resMesa.json();
        console.log('Mesa actualizada:', dataMesa);
      }

      alert('¡Reserva confirmada con éxito!');
      onClose();
    } catch (err) {
      console.error(err);
      alert('No se pudo completar la reserva.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md animate-fade-in">
        <h3 className="text-xl font-bold mb-4">Confirmar Reserva</h3>
        <p><strong>Fecha:</strong> {fecha}</p>
        <p><strong>Huéspedes:</strong> {huespedes}</p>
        <p><strong>Hora:</strong> {hora}</p>
        <p><strong>Mesa:</strong> {mesa ? mesa.numero : 'No seleccionada'}</p>
        <p><strong>Notas:</strong> {notas || 'Ninguna'}</p>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmar}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
