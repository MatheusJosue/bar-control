# 🍸 Bar Control

> PWA para bares e restaurantes controlarem os preparos internos (xaropes, purês, sucos, batch cocktails) e não usarem nada vencido.

🔗 **Demo:** https://bar-control-ui.vercel.app

## ✨ Funcionalidades

- **Dashboard** com preparos vencidos, que vencem hoje, que vencem em breve e dentro da validade
- **Cadastro de preparos** com responsável, data de preparo, validade e área do bar
- **Alertas de validade** com cores por status
- **Controle de estoque**
- **Mobile-first e instalável (PWA)**, com navegação inferior para uso rápido no balcão
- **Tema claro e escuro**

## 🛠️ Tecnologias

| Camada | Tecnologias |
|---|---|
| Front-end | Next.js · React · TypeScript · Tailwind CSS · Lucide |
| API | Node.js · Express · TypeScript · Zod |
| Banco | Supabase (PostgreSQL) |
| Deploy | Vercel (front) · Render (API) |

## 🧠 Decisões técnicas

- **PWA mobile-first**, porque a equipe usa o celular durante o turno, muitas vezes com pressa.
- **API separada em Express**, com validação de entrada usando Zod, para não deixar regra de negócio no front.
- **Status por cor** (vencido, hoje, em breve, ok) para a leitura ser imediata.

## ▶️ Como rodar

```bash
# front-end
npm install
npm run dev

# API
cd server
npm install
npm run dev
```

---

Desenvolvido por [Matheus Cerqueira](https://www.linkedin.com/in/matheusxaviercerqueira/)
