// ============================================================
// CARD COMPONENT
// ============================================================
// Card versátil para exibir dados, métricas ou informações
// em blocos visuais. Inclui variantes de aparência e layout.
//
// Como usar — Card básico:
//   <Card>
//     <p>Conteúdo qualquer aqui</p>
//   </Card>
//
// Como usar — Card de métrica (stat):
//   <Card.Stat
//     label="Receita Total"
//     value="R$ 12.500"
//     trend="+8.2%"
//     trendUp={true}
//     icon={<span>💰</span>}
//   />
//
// Como usar — Card com cabeçalho:
//   <Card>
//     <Card.Header title="Últimas Transações" action={<Button size="sm">Ver tudo</Button>} />
//     <Card.Body>
//       <p>conteúdo</p>
//     </Card.Body>
//   </Card>
//
// Props do Card raiz:
//   variant  — "default" | "elevated" | "bordered" | "glass"
//   padding  — "none" | "sm" | "md" | "lg"
//   hoverable — adiciona efeito de elevação no hover
//   className — classes extras para sobrescrever estilos
// ============================================================

// ── Tipos das props ──────────────────────────────────────────
type CardVariant = "default" | "elevated" | "bordered" | "glass";
type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

interface CardStatProps {
  label: string;
  value: string;
  trend?: string;       // ex: "+8.2%" ou "-3.1%"
  trendUp?: boolean;    // true = verde (positivo), false = vermelho (negativo)
  icon?: React.ReactNode;
  className?: string;
}

// ── Estilos por variante ─────────────────────────────────────
const variantStyles: Record<CardVariant, string> = {
  default:  "bg-zinc-900 border border-zinc-800",
  elevated: "bg-zinc-900 border border-zinc-800 shadow-xl",
  bordered: "bg-transparent border-2 border-zinc-700",
  glass:    "bg-white/5 border border-white/10 backdrop-blur-md",
};

// ── Estilos de padding ───────────────────────────────────────
const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm:   "p-3",
  md:   "p-5",
  lg:   "p-7",
};

// ── Subcomponente: Card.Header ───────────────────────────────
// Cabeçalho com título, subtítulo e uma área de ação (ex: botão)
function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-white font-semibold text-base leading-tight">{title}</h3>
        {subtitle && <p className="text-zinc-500 text-sm mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="ml-4 flex-shrink-0">{action}</div>}
    </div>
  );
}

// ── Subcomponente: Card.Body ─────────────────────────────────
// Wrapper simples para o conteúdo do card quando há header/footer separados
function CardBody({ children, className = "" }: CardBodyProps) {
  return <div className={className}>{children}</div>;
}

// ── Subcomponente: Card.Stat ─────────────────────────────────
// Card de métrica pronto para usar em dashboards
function CardStat({ label, value, trend, trendUp, icon, className = "" }: CardStatProps) {
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-2xl p-5 ${className}`}>
      {/* Linha superior: label e ícone */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-zinc-400 text-sm font-medium">{label}</span>
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-violet-600/20 text-violet-400 flex items-center justify-center text-lg">
            {icon}
          </div>
        )}
      </div>

      {/* Valor principal */}
      <p className="text-white text-2xl font-bold tracking-tight">{value}</p>

      {/* Indicador de tendência (opcional) */}
      {trend && (
        <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${trendUp ? "text-emerald-400" : "text-red-400"}`}>
          {/* Seta para cima ou para baixo */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            {trendUp ? (
              <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
            )}
          </svg>
          <span>{trend}</span>
          <span className="text-zinc-500 font-normal">vs. mês anterior</span>
        </div>
      )}
    </div>
  );
}

// ── Componente Raiz ──────────────────────────────────────────
export function Card({
  variant = "default",
  padding = "md",
  hoverable = false,
  className = "",
  children,
}: CardProps) {
  return (
    <div
      className={`
        rounded-2xl
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${hoverable ? "hover:border-zinc-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// ── Associação dos subcomponentes ao padrão Card.X ──────────
// Isso permite usar <Card.Header>, <Card.Body>, <Card.Stat>
Card.Header = CardHeader;
Card.Body   = CardBody;
Card.Stat   = CardStat;
