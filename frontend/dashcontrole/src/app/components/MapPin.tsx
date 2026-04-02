// ============================================================
// MAP PIN COMPONENT
// ============================================================
// Componente que exibe um local específico no Google Maps
// usando iframe embed. Recebe latitude e longitude e mostra
// o mapa centralizado naquele ponto com um marcador.
//
// Como usar:
//   <MapPin lat={-23.5505} lng={-46.6333} height={400} />
//
// Props:
//   lat       — Latitude do local (obrigatório)
//   lng       — Longitude do local (obrigatório)
//   height    — Altura do mapa em pixels (padrão: 400)
//   label     — Rótulo opcional para exibir acima do mapa
//   zoom      — Nível de zoom do mapa (padrão: 15)
//   className — Classes extras para sobrescrever estilos
// ============================================================

interface MapPinProps {
  lat: number;
  lng: number;
  height?: number;
  label?: string;
  zoom?: number;
  className?: string;
}

export function MapPin({
  lat,
  lng,
  height = 400,
  label,
  zoom = 15,
  className = "",
}: MapPinProps) {
  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!mapsApiKey) {
    return (
      <div className={`w-full ${className}`}>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Configure a variavel <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> no arquivo .env para carregar o mapa.
        </div>
      </div>
    );
  }

  // Monta a URL do Google Maps Embed com o ponto centralizado
  // O parâmetro "q" define o marcador no mapa
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${mapsApiKey}&q=${lat},${lng}&zoom=${zoom}`;

  return (
    <div className={`w-full ${className}`}>
      {/* Rótulo opcional acima do mapa */}
      {label && (
        <div className="mb-3">
          <h3 className="text-[var(--foreground)] font-semibold text-base">{label}</h3>
          <p className="text-zinc-500 text-sm mt-0.5">
            {lat.toFixed(6)}, {lng.toFixed(6)}
          </p>
        </div>
      )}

      {/* Container do mapa com borda arredondada e sombra */}
      <div
        className="rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--surface-2)]"
        style={{ height: `${height}px` }}
      >
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
          title={`Mapa - ${lat}, ${lng}`}
        />
      </div>
    </div>
  );
}
