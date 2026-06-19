# 171 ScreenS — Site (Curso + Scanner)

Site completo: curso de telagem, scanner (pins, results, keys, enterprise), admin e owner.

**Login:** Discord only (Google em breve).

## Deploy Vercel

1. Importa este repo na [Vercel](https://vercel.com)
2. Copia vars de `.env.example` → Environment Variables
3. Deploy → atualiza `NEXT_PUBLIC_APP_URL` com URL real → redeploy

## Discord OAuth redirect

`https://SUA-URL.vercel.app/api/auth/callback/discord`

## Local

```bash
npm install
copy .env.local.example .env.local
npm run dev
```

Abre `http://localhost:3007`
