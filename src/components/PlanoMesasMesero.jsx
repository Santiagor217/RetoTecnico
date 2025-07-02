import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/mesas";

const estadoColores = {
  libre: "#10b981",
  reservada: "#facc15",
  ocupada: "#ef4444",
};

function PlanoMesasMesero() {
  const [mesas, setMesas] = useState([]);
  const [mesaActiva, setMesaActiva] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Obtener mesas desde la API
  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setMesas(data);
        setCargando(false);
      } catch (err) {
        setError("Error al cargar mesas");
        setCargando(false);
      }
    };
    fetchMesas();
  }, []);

  // PATCH para actualizar una mesa
  const actualizarEstadoMesa = async (id, nuevoEstado) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      setMesas((prev) =>
        prev.map((mesa) =>
          mesa.id === id ? { ...mesa, estado: nuevoEstado } : mesa
        )
      );
      setMesaActiva(null);
    } catch (err) {
      alert("No se pudo actualizar la mesa");
    }
  };

  const handleFondoClick = () => {
    setMesaActiva(null);
  };

  if (cargando) {
    return <p className="text-center text-gray-600">Cargando mesas...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div
      onClick={handleFondoClick}
      className="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">Gestión de Mesas</h2>

      <svg
        width="100%"
        height="300"
        viewBox="0 0 320 200"
        className="border border-gray-300 rounded-lg bg-gray-50"
      >
        {mesas.map((mesa) => (
          <g
            key={mesa.id}
            transform={`translate(${mesa.x}, ${mesa.y})`}
            onClick={(e) => {
              e.stopPropagation();
              setMesaActiva(mesa.id);
            }}
            className="cursor-pointer"
          >
            <rect
              width="60"
              height="40"
              rx="8"
              fill={estadoColores[mesa.estado]}
              stroke="#000"
              strokeWidth="1"
              className="hover:scale-105 transform transition-transform origin-center"
            />
            <text
              x="30"
              y="25"
              textAnchor="middle"
              fill="#fff"
              fontSize="14"
              fontWeight="bold"
            >
              {mesa.id}
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-6 text-sm text-gray-600 flex justify-center gap-4">
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 bg-green-500 inline-block rounded"></span> Libre
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 bg-yellow-400 inline-block rounded"></span> Reservada
        </span>
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 bg-red-500 inline-block rounded"></span> Ocupada
        </span>
      </div>

      {mesaActiva && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold mb-2">
            Cambiar estado de la mesa {mesaActiva}
          </h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => actualizarEstadoMesa(mesaActiva, "libre")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Libre
            </button>
            <button
              onClick={() => actualizarEstadoMesa(mesaActiva, "reservada")}
              className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
            >
              Reservada
            </button>
            <button
              onClick={() => actualizarEstadoMesa(mesaActiva, "ocupada")}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Ocupada
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlanoMesasMesero;

