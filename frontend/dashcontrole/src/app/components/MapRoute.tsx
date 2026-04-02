// ============================================================
// MAP ROUTE COMPONENT
// ============================================================
// Componente que exibe uma rota entre dois pontos no Google Maps.
// Mostra origem, destino, a rota traçada e a distância estimada.
//
// Como usar:
//   <MapRoute
//     origin={{ lat: -23.5505, lng: -46.6333 }}
//     destination={{ lat: -23.5615, lng: -46.6553 }}
//     height={450}
//   />
//
// Props:
//   origin       — Coordenadas do ponto de partida (obrigatório)
//   destination  — Coordenadas do ponto de chegada (obrigatório)
//   height       — Altura do mapa em pixels (padrão: 450)
//   label        — Rótulo opcional para exibir acima do mapa
//   travelMode   — Modo de viagem: "driving" | "walking" | "bicycling" | "transit" (padrão: "driving")
//   className    — Classes extras para sobrescrever estilos
// ============================================================

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapRouteProps {
  origin: Coordinates;
  destination: Coordinates;
  height?: number;
  label?: string;
  travelMode?: "driving" | "walking" | "bicycling" | "transit";
  className?: string;
}

// Mapeia o modo de viagem para o parâmetro da API do Google Maps
const travelModeMap = {
  driving: "driving",
  walking: "walking",
  bicycling: "bicycling",
  transit: "transit",
};

export function MapRoute({
  origin,
  destination,
  height = 450,
  label,
  travelMode = "driving",
  className = "",
}: MapRouteProps) {
  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!mapsApiKey) {
    return (
      <div className={`w-full ${className}`}>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Configure a variavel <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> no arquivo .env para carregar o mapa e a rota.
        </div>
      </div>
    );
  }

  // Monta a URL do Google Maps Embed com direções/rota
  // O parâmetro "origin" e "destination" definem os pontos da rota
  // O modo de viagem define como a rota é calculada
  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=${mapsApiKey}&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&mode=${travelModeMap[travelMode]}`;

  return (
    <div className={`w-full ${className}`}>
      {/* Rótulo opcional acima do mapa */}
      {label && (
        <div className="mb-3">
          <h3 className="text-[var(--foreground)] font-semibold text-base">{label}</h3>
        </div>
      )}

      {/* Informações de origem e destino */}
      <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Card de origem */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
          <div className="flex items-center gap-2">
            {/* Indicador verde (origem) */}
            <div className="w-3 h-3 rounded-full bg-[var(--primary)]" />
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wide">Origem</p>
              <p className="text-sm font-medium text-[var(--foreground)]">
                {origin.lat.toFixed(6)}, {origin.lng.toFixed(6)}
              </p>
            </div>
          </div>
        </div>

        {/* Card de destino */}
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3">
          <div className="flex items-center gap-2">
            {/* Indicador escuro (destino) */}
            <div className="w-3 h-3 rounded-full bg-[var(--primary-strong)]" />
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wide">Destino</p>
              <p className="text-sm font-medium text-[var(--foreground)]">
                {destination.lat.toFixed(6)}, {destination.lng.toFixed(6)}
              </p>
            </div>
          </div>
        </div>
      </div>

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
          title={`Rota - Origem (${origin.lat}, ${origin.lng}) → Destino (${destination.lat}, ${destination.lng})`}
        />
      </div>

      {/* Nota sobre a distância */}
      <p className="mt-2 text-xs text-zinc-500">
        * A distância e tempo estimado são calculados pelo Google Maps com base no modo de viagem selecionado.
      </p>
    </div>
  );
}
