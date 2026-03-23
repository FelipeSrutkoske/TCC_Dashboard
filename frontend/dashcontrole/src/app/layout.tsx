import "./globals.css";
import { Sidebar } from "./components/Sidebar";

export const metadata = {
  title: "DashControle",
  description: "Sistema de Gerenciamento de Rotas e Entregas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="h-full text-zinc-900 antialiased">

        {/* 
          1. Sidebar fixa:
          Controla a largura do conteúdo via CSS Variable --sidebar-width
        */}
        <Sidebar />

        {/* 
          2. Área principal de conteúdo:
          Usa o padding-left dinâmico para não sobrepor a sidebar.
        */}
        <div className="with-sidebar-offset min-h-screen transition-all duration-300 p-3 sm:p-4">
          
          {/* 
            3. O "Container" do TCC:
            Envolve toda a página dentro de uma moldura centralizada, 
            dando o aspecto de bloco empresarial que você pediu.
          */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="route-frame flex-1 overflow-hidden">
              {/* O conteúdo das páginas (children) será renderizado aqui dentro */}
              {children}
            </div>

            {/* Rodapé discreto fora do container (opcional) */}
            <footer className="mt-3 px-2 flex justify-between items-center text-[10px] text-[#6f786d] uppercase tracking-widest font-medium">
              <span>© 2026 Sistema DashControle • Logística de Rotas</span>
              <span>Versão 1.0.0-Beta</span>
            </footer>
          </div>

        </div>

      </body>
    </html>
  );
}
