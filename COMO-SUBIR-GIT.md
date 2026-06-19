# Como subir no GitHub (passo a passo)

## Por que deu "100 arquivos"?

Se você arrastou pasta no site do GitHub, **o limite é 100 arquivos por upload na web**.
O projeto tem ~100 arquivos de código — passa do limite.

**Solução:** usar Git no terminal (sem limite) ou GitHub Desktop.

---

## Opção 1 — GitHub Desktop (mais fácil)

1. Baixa: https://desktop.github.com/
2. Instala e faz login na tua conta GitHub
3. **File → Add local repository**
4. Escolhe a pasta: `C:\Users\fkdhtk\Desktop\PUBLIC\171-screens-web`
5. Se pedir, clica **create a repository**
6. **Publish repository** → nome: `171-screens-web` → Private ou Public
7. Pronto — sobe tudo (ignora `node_modules` pelo `.gitignore`)

---

## Opção 2 — Git no terminal

1. Instala Git: https://git-scm.com/download/win
2. Abre **Git Bash** na pasta do projeto:

```bash
cd /c/Users/fkdhtk/Desktop/PUBLIC/171-screens-web
git init
git add .
git commit -m "171 ScreenS — site produção"
git branch -M main
```

3. Cria repo vazio no GitHub (sem README, sem .gitignore)
4. Conecta e sobe:

```bash
git remote add origin https://github.com/SEU_USER/171-screens-web.git
git push -u origin main
```

---

## Opção 3 — Vercel sem Git

Na pasta do projeto (com Node instalado):

```bash
cd C:\Users\fkdhtk\Desktop\PUBLIC\171-screens-web
npm i -g vercel
vercel login
vercel
```

Cola as env vars do `.env.example` quando pedir.

---

## O que NÃO sobe (já no .gitignore)

- `node_modules/`
- `.next/`
- `.env.local` (secrets)
- `public/scanner/*.exe`

## Fix TypeScript (já aplicado)

`src/lib/user-lookup.ts` — `email: string | null` (build Vercel passa).
