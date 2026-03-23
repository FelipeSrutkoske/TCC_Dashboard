// ============================================================
// Página /componentes — Vitrine dos componentes do sistema
// ============================================================
// Acesse em: http://localhost:3000/componentes
// Esta página demonstra todos os componentes reutilizáveis.
// ============================================================

"use client";

import { useState } from "react";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";

export default function ComponentesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      {/* Header da página */}
      <Header
        title="Componentes"
        breadcrumb={["Home", "Componentes"]}
        userName="Dev"
        actions={
          <Button size="sm" variant="outline">
            Ver código-fonte
          </Button>
        }
      />

      <div className="p-6 space-y-10 max-w-5xl">

        {/* ── SEÇÃO: Cards de Métricas ──────────────────────── */}
        <section>
          <SectionTitle number="01" title="Card.Stat" subtitle="Cards de métricas para dashboards" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card.Stat label="Receita Total"   value="R$ 12.500" trend="+8.2%"  trendUp={true}  icon="💰" />
            <Card.Stat label="Despesas"        value="R$ 4.320"  trend="+2.1%"  trendUp={false} icon="📉" />
            <Card.Stat label="Saldo"           value="R$ 8.180"  trend="+14.3%" trendUp={true}  icon="🏦" />
            <Card.Stat label="Transações"      value="47"        trend="+5"     trendUp={true}  icon="🔄" />
          </div>
        </section>

        {/* ── SEÇÃO: Variantes de Card ──────────────────────── */}
        <section>
          <SectionTitle number="02" title="Card" subtitle="Variantes de aparência" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="default">
              <Card.Header title="Default" subtitle="Fundo zinc-900 com borda sutil" />
              <Card.Body><p className="text-zinc-400 text-sm">Uso geral para qualquer conteúdo.</p></Card.Body>
            </Card>

            <Card variant="elevated" hoverable>
              <Card.Header title="Elevated + Hoverable" subtitle="Sombra + float ao hover" />
              <Card.Body><p className="text-zinc-400 text-sm">Passe o mouse para ver o efeito.</p></Card.Body>
            </Card>

            <Card variant="glass">
              <Card.Header title="Glass" subtitle="Glassmorphism com blur" />
              <Card.Body><p className="text-zinc-400 text-sm">Ideal para overlays e hero sections.</p></Card.Body>
            </Card>
          </div>
        </section>

        {/* ── SEÇÃO: Botões — Variantes ─────────────────────── */}
        <section>
          <SectionTitle number="03" title="Button" subtitle="Variantes de cor" />
          <Card>
            <Card.Body className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="outline">Outline</Button>
            </Card.Body>

            {/* Tamanhos */}
            <div className="mt-5 pt-4 border-t border-zinc-800">
              <p className="text-zinc-500 text-xs mb-3 font-medium uppercase tracking-wider">Tamanhos</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Pequeno (sm)</Button>
                <Button size="md">Médio (md)</Button>
                <Button size="lg">Grande (lg)</Button>
              </div>
            </div>

            {/* Estados */}
            <div className="mt-5 pt-4 border-t border-zinc-800">
              <p className="text-zinc-500 text-xs mb-3 font-medium uppercase tracking-wider">Estados</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button loading>Carregando...</Button>
                <Button disabled>Desabilitado</Button>
                <Button
                  leftIcon={<span>✨</span>}
                  rightIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                  }
                >
                  Com ícones
                </Button>
                <Button variant="danger" fullWidth>
                  Botão largura total (fullWidth)
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* ── SEÇÃO: Modal ──────────────────────────────────── */}
        <section>
          <SectionTitle number="04" title="Modal" subtitle="Com animações de abertura e fechamento" />
          <Card>
            <Card.Body className="flex flex-wrap gap-3">
              {/* Modal de formulário */}
              <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                Abrir Modal (Formulário)
              </Button>

              {/* Modal destrutivo */}
              <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
                Abrir Modal (Confirmação)
              </Button>
            </Card.Body>

            <div className="mt-4 pt-4 border-t border-zinc-800">
              <p className="text-zinc-500 text-xs">
                Feche com: botão <code className="text-violet-400">✕</code>, clique no backdrop, ou tecla <code className="text-violet-400">ESC</code>
              </p>
            </div>
          </Card>
        </section>

      </div>

      {/* ── Modal de Formulário ───────────────────────────────── */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nova Transação"
        description="Preencha os dados para registrar uma nova transação."
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button variant="success" onClick={() => setIsModalOpen(false)}>Salvar</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Descrição</label>
            <input
              type="text"
              placeholder="Ex: Supermercado"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Valor (R$)</label>
            <input
              type="number"
              placeholder="0,00"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1.5">Tipo</label>
            <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors">
              <option value="expense">Despesa</option>
              <option value="income">Receita</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* ── Modal de Confirmação ──────────────────────────────── */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar exclusão"
        description="Esta ação não pode ser desfeita. O item será removido permanentemente."
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
            <Button variant="danger" onClick={() => setIsDeleteModalOpen(false)}>Sim, excluir</Button>
          </>
        }
      >
        <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
          <span className="text-red-400 text-lg flex-shrink-0">⚠️</span>
          <p className="text-sm text-red-300">
            Você está prestes a excluir <strong className="text-white">Transação #47</strong>. Esta ação é permanente.
          </p>
        </div>
      </Modal>
    </>
  );
}

// ── Componente auxiliar: título de seção ─────────────────────
// Só existe nessa página, então fica aqui mesmo
function SectionTitle({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-xs font-mono text-violet-400 bg-violet-600/10 border border-violet-600/20 px-2 py-0.5 rounded-md">
        {number}
      </span>
      <div>
        <h2 className="text-white font-semibold text-base leading-none">{title}</h2>
        <p className="text-zinc-500 text-xs mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
