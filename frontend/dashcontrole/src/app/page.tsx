import { Header } from "./components/Header";

export default function Home() {
  return (
    <>
      {/* Header comum do sistema */}
      <Header
        title="Visão Geral de Operações"
        breadcrumb={["Home", "Operações"]}
        userName="João Silva"
      />

      {/*
        Home de protótipo:
        - Estrutura em blocos empresariais (cards)
        - Dados estáticos para visual inicial
        - Responsivo para desktop e mobile
      */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Bloco de abertura */}
        <section className="rounded-2xl border border-[#c8cec8] bg-[linear-gradient(135deg,#f2f5f2_0%,#e8eee8_100%)] p-5 sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#6f786d] font-semibold">
                Centro de Controle Logístico
              </p>
              <h2 className="mt-2 text-xl sm:text-2xl text-[#1f2320] font-semibold leading-tight">
                Gestão de rotas, entregas e produtividade da equipe
              </h2>
              <p className="mt-3 text-sm text-[#5f695d] max-w-2xl">
                Protótipo da página inicial do DashControle com visão rápida de operação diária,
                acompanhamento de prazos e monitoramento de performance.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full lg:w-auto">
              <div className="rounded-xl border border-[#bfc6bf] bg-white/75 px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-[#758172]">Data</p>
                <p className="text-sm font-semibold text-[#253126]">22 Mar 2026</p>
              </div>
              <div className="rounded-xl border border-[#bfc6bf] bg-white/75 px-3 py-2">
                <p className="text-[11px] uppercase tracking-wide text-[#758172]">Turno</p>
                <p className="text-sm font-semibold text-[#253126]">Manhã</p>
              </div>
            </div>
          </div>
        </section>

        {/* Indicadores principais */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { label: "Entregas hoje", value: "148", detail: "+12 em relação a ontem" },
            { label: "Em rota", value: "39", detail: "26% do total diário" },
            { label: "Atrasos ativos", value: "6", detail: "4% das entregas do turno" },
            { label: "Eficiência", value: "93%", detail: "Meta mínima: 90%" },
          ].map((item) => (
            <article key={item.label} className="rounded-2xl border border-[#c8cec8] bg-[#f8faf8] p-4">
              <p className="text-xs uppercase tracking-wide text-[#748071]">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold text-[#1f2320] tracking-tight">{item.value}</p>
              <p className="mt-2 text-xs text-[#667062]">{item.detail}</p>
            </article>
          ))}
        </section>

        {/* Linha com prioridades e atividades */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <article className="xl:col-span-2 rounded-2xl border border-[#c8cec8] bg-[#f8faf8] p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-semibold text-[#1f2320]">Prioridades do dia</h3>
              <span className="rounded-full border border-[#9eb198] bg-[#dfe8dc] px-2.5 py-1 text-[11px] uppercase tracking-wide text-[#3f533b] font-semibold">
                Operação ativa
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {[
                {
                  title: "Revisar cargas da rota norte",
                  context: "8 veículos pendentes de conferência",
                  status: "Alta",
                },
                {
                  title: "Realocar equipe de apoio",
                  context: "Setor centro com demanda acima do planejado",
                  status: "Média",
                },
                {
                  title: "Validar checklist de retorno",
                  context: "Conferência de avarias em 3 veículos",
                  status: "Baixa",
                },
              ].map((task) => (
                <div key={task.title} className="rounded-xl border border-[#d3d8d3] bg-white/70 p-3.5 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[#2b3429]">{task.title}</p>
                    <p className="mt-1 text-xs text-[#677063]">{task.context}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#4f654b] bg-[#e6ece5] border border-[#c4d0c1] rounded-md px-2 py-1">
                    {task.status}
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-[#c8cec8] bg-[#f8faf8] p-5">
            <h3 className="text-base font-semibold text-[#1f2320]">Atividade recente</h3>
            <ul className="mt-4 space-y-3">
              {[
                "Rota Sul finalizada com 97% de entregas no prazo.",
                "Novo motorista vinculado ao veículo VTR-024.",
                "Ocorrência registrada: atraso por bloqueio viário.",
                "Checklist de manutenção concluído para 4 veículos.",
              ].map((event) => (
                <li key={event} className="text-sm text-[#5d675b] leading-relaxed border-l-2 border-[#aab7a7] pl-3">
                  {event}
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </>
  );
}
