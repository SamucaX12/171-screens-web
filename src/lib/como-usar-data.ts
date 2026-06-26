import { DISCORD_URL } from "./course-data";

export type GuideStep = {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  image: string;
  bullets: string[];
  cta?: { label: string; href: string; external?: boolean };
  faq?: { q: string; a: string }[];
};

export const GUIDE_STEPS: GuideStep[] = [
  {
    id: "login",
    step: 1,
    title: "Entrar com Discord",
    subtitle: "Sem Google — só Discord do servidor 171 ScreenS",
    image: "/guide/como-usar-01-login.png",
    bullets: [
      "Abre o site e clica em **Entrar** ou **Dashboard**",
      "Escolhe **Entrar com Discord** (não use Google)",
      "Autoriza o login — pronto, você cai no painel",
    ],
    cta: { label: "Fazer login agora", href: "/login" },
    faq: [
      { q: "Não consigo entrar", a: "Use o mesmo Discord que está no servidor 171. Entre no Discord antes." },
      { q: "Aparece sem acesso", a: "Normal se ainda não comprou nem deu boost — veja o passo 2." },
    ],
  },
  {
    id: "cargo",
    step: 2,
    title: "Liberar o curso (cargo)",
    subtitle: "Comprou ou deu boost? Sincroniza uma vez",
    image: "/guide/como-usar-02-curso.png",
    bullets: [
      "No **Início**, clica em **Sincronizar cargo**",
      "Booster: libera **5 aulas grátis** no Tier I",
      "Comprou Tier I/II/III: libera o tier inteiro automaticamente",
      "Se não mudou, espera 1 min e sincroniza de novo",
    ],
    cta: { label: "Ir pro Início", href: "/dashboard" },
    faq: [
      { q: "Dei boost e não liberou", a: "Entra com Discord, dá boost no servidor 171 e clica Sincronizar cargo." },
      { q: "Comprei e continua bloqueado", a: "Abre ticket no Discord com comprovante — staff ajusta o cargo." },
    ],
  },
  {
    id: "curso",
    step: 3,
    title: "Estudar no Meu Curso",
    subtitle: "Cada aula = passo a passo na SS, na ordem",
    image: "/guide/como-usar-03-aula.png",
    bullets: [
      "Menu lateral → **Meu Curso**",
      "Escolhe teu **Tier** (I, II ou III) na barra esquerda",
      "Abre a **categoria** (Windows, Bypass, Sysmon...)",
      "Clica na aula → lê tudo → marca o **checklist** no final",
      "Booster: vai direto em **Curso Booster** (5 aulas fixas)",
    ],
    cta: { label: "Abrir Meu Curso", href: "/dashboard/curso" },
    faq: [
      { q: "Qual aula começar?", a: "Tier I: começa por Prefetch ou vai no Curso Booster se for boost." },
      { q: "Cadeado na aula", a: "Tier acima do teu ou booster — compra ou dá boost pra liberar." },
      { q: "É vídeo?", a: "Texto passo a passo + checklist. Lê na ordem, igual SS real." },
    ],
  },
  {
    id: "app",
    step: 4,
    title: "Baixar o App Scanner",
    subtitle: "Link que o telador manda — digita o PIN no app",
    image: "/guide/como-usar-04-download.png",
    bullets: [
      "Telador cria um **pin** e manda o link: `seusite.com/install/XXXXXX`",
      "Clica em **Baixar 171-screens.exe**",
      "Abre o programa no PC",
      "Digita o **PIN de 8 caracteres** que aparece na página",
      "Clica **INICIAR SCAN** — telador vê ao vivo",
    ],
    cta: { label: "Área Scanner (telador)", href: "/dashboard/scanner/pins" },
    faq: [
      { q: "Onde pego o link de download?", a: "O telador manda no Discord. Formato: /install/ + teu pin." },
      { q: "Preciso extrair zip?", a: "Não. Baixa só o .exe, abre e digita o PIN." },
      { q: "Sou aluno do curso, preciso do app?", a: "Curso = teoria na SS. App = prática de scan (telador ou plano Scanner)." },
    ],
  },
];

export const QUICK_FAQ = [
  {
    q: "O que é Tier I, II e III?",
    a: "Tier I = base (Windows, prefetch, temp). Tier II = bypass + Sysmon. Tier III = avançado + privado.",
  },
  {
    q: "Booster libera o curso inteiro?",
    a: "Não. Libera só 5 aulas de degustação no Tier I. Tier completo = compra.",
  },
  {
    q: "Onde compro?",
    a: "Menu Comprar no site ou ticket no Discord.",
  },
  {
    q: "Preciso instalar algo pro curso?",
    a: "Não. Curso roda no navegador. App scanner é separado (passo 4).",
  },
];

export { DISCORD_URL };
