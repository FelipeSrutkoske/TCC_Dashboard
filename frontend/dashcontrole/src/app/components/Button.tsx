// ============================================================
// BUTTON COMPONENT
// ============================================================
// Botão reutilizável com múltiplas variantes de cor e tamanho.
//
// Como usar:
//   <Button>Clique aqui</Button>
//   <Button variant="danger">Excluir</Button>
//   <Button variant="success" size="lg">Confirmar</Button>
//   <Button variant="outline" loading>Aguarde...</Button>
//   <Button disabled>Desabilitado</Button>
//
// Props:
//   variant  — estilo visual do botão (ver tabela abaixo)
//   size     — tamanho do botão: "sm" | "md" | "lg"
//   loading  — exibe spinner e desabilita interação
//   disabled — desabilita o botão normalmente
//   fullWidth — ocupa 100% da largura disponível
//   leftIcon  — ícone à esquerda do texto (qualquer ReactNode)
//   rightIcon — ícone à direita do texto (qualquer ReactNode)
//   onClick  — função chamada ao clicar
//
// Variantes disponíveis:
//   "primary"  → Roxo (padrão) — ação principal
//   "secondary"→ Cinza escuro — ação secundária
//   "danger"   → Vermelho — ação destrutiva
//   "success"  → Verde — confirmação
//   "warning"  → Laranja — atenção
//   "ghost"    → Transparente com borda — ação discreta
//   "outline"  → Borda neon — estilo terminal/tech
// ============================================================

"use client";

import { ButtonHTMLAttributes } from "react";

// ── Tipos das props ──────────────────────────────────────────
type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "warning" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// ── Mapeamento de variantes para classes CSS ─────────────────
// Adicione novas variantes aqui sem precisar mexer no JSX abaixo
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-violet-600 text-white hover:bg-violet-500 active:bg-violet-700 border border-violet-600",

  secondary:
    "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 active:bg-zinc-900 border border-zinc-700",

  danger:
    "bg-red-600 text-white hover:bg-red-500 active:bg-red-700 border border-red-600",

  success:
    "bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 border border-emerald-600",

  warning:
    "bg-amber-500 text-zinc-900 hover:bg-amber-400 active:bg-amber-600 border border-amber-500",

  ghost:
    "bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-white active:bg-zinc-900 border border-transparent",

  outline:
    "bg-transparent text-violet-400 border border-violet-500 hover:bg-violet-600/10 hover:text-violet-300 active:bg-violet-600/20",
};

// ── Mapeamento de tamanhos para classes CSS ──────────────────
const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs px-3 py-1.5 gap-1.5 rounded-md",
  md: "text-sm px-4 py-2   gap-2   rounded-lg",
  lg: "text-base px-6 py-3 gap-2.5 rounded-xl",
};

// ── Spinner SVG animado ──────────────────────────────────────
function Spinner() {
  return (
    <svg
      className="animate-spin w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
    </svg>
  );
}

// ── Componente Principal ─────────────────────────────────────
export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  // Botão é desabilitado tanto quando `disabled` quanto quando `loading`
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center font-medium
        transition-all duration-150 cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950
        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...rest}
    >
      {/* Spinner (quando loading) ou ícone esquerdo */}
      {loading ? <Spinner /> : leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}

      {/* Texto do botão */}
      {children}

      {/* Ícone direito — não aparece durante loading */}
      {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
}
