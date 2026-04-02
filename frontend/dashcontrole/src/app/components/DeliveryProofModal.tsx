// ============================================================
// DELIVERY PROOF MODAL — Modal de Comprovante de Entrega
// ============================================================
// Exibe: mapa Google Maps, assinatura digital e status da rota.
// Dados mockados até que a tabela tb_finalizacoes seja preenchida.
// ============================================================

'use client';

import { useRef, useState } from 'react';
import { Modal } from './Modal';

interface FinalizationData {
  receiverName: string;
  receiverDocument?: string;
  receiverEmail?: string;
  signatureUrl?: string;
  signatureData?: string;
  photoUrl?: string;
  latitude?: number;
  longitude?: number;
  finalizedAt?: string;
}

interface DeliveryProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  deliveryId: number;
  destinationAddress: string;
  driverName?: string;
  finalization?: FinalizationData | null;
  allowDraw?: boolean;
}

// ── Mapa Google Maps Embed ───────────────────────────────────
function EmbedMap({ lat, lng, address }: { lat: number; lng: number; address: string }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const mapUrl = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}&zoom=16&maptype=roadmap`
    : `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt!2sbr!4v1`;

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-700 relative w-full h-[220px] sm:h-[260px]">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={mapUrl}
        title={`Localização: ${address}`}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-8">
        <p className="text-white text-sm font-medium truncate">📍 {address}</p>
        <p className="text-zinc-300 text-[11px]">{lat.toFixed(6)}, {lng.toFixed(6)}</p>
      </div>
    </div>
  );
}

// ── Mini-componente do canvas de assinatura ──────────────────
function SignatureCanvas({ onSave }: { onSave: (dataUrl: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  function getPos(e: React.MouseEvent | React.TouchEvent) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  }

  function startDraw(e: React.MouseEvent | React.TouchEvent) {
    drawing.current = true;
    lastPos.current = getPos(e);
  }

  function draw(e: React.MouseEvent | React.TouchEvent) {
    if (!drawing.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = '#a8bc94';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.stroke();
    lastPos.current = pos;
  }

  function stopDraw() {
    if (!drawing.current) return;
    drawing.current = false;
    onSave(canvasRef.current!.toDataURL());
  }

  return (
    <div className="w-full h-full flex flex-col pt-1">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] uppercase text-zinc-500 font-bold z-10">Assinatura</span>
        <button className="text-[10px] text-zinc-500 hover:text-red-400 z-10 tracking-wider font-bold" onClick={() => {
          const canvas = canvasRef.current!;
          const ctx = canvas.getContext('2d')!;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          onSave('');
        }}>LIMPAR</button>
      </div>
      <canvas
        ref={canvasRef}
        width={400}
        height={90}
        className="w-full flex-1 rounded-lg border border-zinc-700 bg-zinc-900 cursor-crosshair touch-none"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
      />
    </div>
  );
}

// ── Componente Principal ─────────────────────────────────────
export function DeliveryProofModal({
  isOpen,
  onClose,
  deliveryId,
  destinationAddress,
  driverName,
  finalization,
  allowDraw = false,
}: DeliveryProofModalProps) {
  const [signatureData, setSignatureData] = useState('');

  // Mock dados caso não haja finalização real ainda da API
  const mockFinalization: FinalizationData = finalization ?? {
    receiverName: 'João da Silva (MOCK)',
    receiverDocument: '123.456.789-00',
    receiverEmail: 'cliente@email.com',
    latitude: -23.5505,
    longitude: -46.6333,
    finalizedAt: new Date().toISOString(),
  };

  const lat = mockFinalization.latitude ?? -23.5505;
  const lng = mockFinalization.longitude ?? -46.6333;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Comprovante — Entrega #${deliveryId}`}
      description={destinationAddress}
      size="xl"
    >
      <div className="space-y-4">
        
        {!finalization && (
          <div className="text-[10px] text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-2 flex items-center gap-2">
            <span>⚠️</span> Dados mockados — entrega ainda não finalizada no sistema
          </div>
        )}

        {/* 1. MAPA DO GOOGLE (TOPO) */}
        <EmbedMap lat={lat} lng={lng} address={destinationAddress} />

        {/* 2. LINHA DO MEIO: ASSINATURA + ENTREGUE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[140px]">
          
          {/* Caixa da Assinatura */}
          <div className="rounded-xl border border-zinc-700 bg-zinc-800/40 p-3 h-full relative flex flex-col justify-center">
            {mockFinalization.signatureUrl || mockFinalization.signatureData || signatureData ? (
              <>
                <span className="absolute top-3 left-3 text-[10px] uppercase text-zinc-500 font-bold z-10">Assinatura</span>
                <div className="w-full h-full pt-6 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mockFinalization.signatureUrl ?? mockFinalization.signatureData ?? signatureData}
                    alt="Assinatura do recebedor"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
              </>
            ) : allowDraw ? (
              <SignatureCanvas onSave={setSignatureData} />
            ) : (
              <>
                <span className="absolute top-3 left-3 text-[10px] uppercase text-zinc-500 font-bold z-10">Assinatura</span>
                <div className="w-full h-full flex flex-col items-center justify-center opacity-40">
                  <span className="text-3xl mb-1">✍</span>
                  <span className="text-[11px] text-zinc-400">Nenhuma assinatura registrada</span>
                </div>
              </>
            )}
          </div>

          {/* Caixa de Status (Entregue) */}
          <div className="rounded-xl border border-[#4f654b]/40 bg-[#4f654b]/10 flex flex-col items-center justify-center h-full gap-2 shadow-inner">
             <div className="w-12 h-12 rounded-full bg-[#4f654b]/20 flex items-center justify-center border border-[#4f654b]/30">
                <span className="text-[#8a9488] text-2xl font-bold">✓</span>
             </div>
             <span className="text-[#8a9488] font-bold text-[15px] tracking-[0.25em] uppercase mt-1">Entregue</span>
          </div>

        </div>

        {/* 3. GRID INFERIOR: DADOS DO RECEBEDOR E ENTREGADOR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Nome do recebedor',             value: mockFinalization.receiverName },
            { label: 'Documento',                     value: mockFinalization.receiverDocument || '—' },
            { label: 'Email de envio do comprovante', value: mockFinalization.receiverEmail || '—' },
            { label: 'Entregador',                    value: driverName || '—' }, // Vem do banco ou fallback
            { label: 'Data de finalização',           value: mockFinalization.finalizedAt ? new Date(mockFinalization.finalizedAt).toLocaleString() : '—' },
            { label: 'Coordenadas',                   value: `${lat.toFixed(6)}, ${lng.toFixed(6)}` }
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-zinc-800/30 p-3 px-4 border border-zinc-700/50">
              <p className="text-[10px] uppercase text-zinc-500 font-bold mb-0.5 tracking-wider">{label}</p>
              <p className="text-zinc-200 text-[13px] font-medium leading-relaxed truncate">{value}</p>
            </div>
          ))}
        </div>

      </div>
    </Modal>
  );
}
