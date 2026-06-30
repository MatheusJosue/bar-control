# Bar Prep Control — Documento inicial para implementação do MVP

## 1. Objetivo do projeto

Criar a primeira versão visual de uma aplicação PWA para controle operacional de bar/restaurante, focada inicialmente em:

- Dashboard principal
- Controle visual de preparos ativos
- Alertas de validade
- Visão mobile-first
- Dados mockados no frontend
- Estrutura preparada para futura integração com API

Nesta primeira etapa, o objetivo não é criar backend, autenticação real ou banco de dados. O foco é construir uma base visual navegável para validar o conceito do produto.

---

## 2. Conceito do produto

O sistema será usado por bares/restaurantes para controlar preparos internos como:

- Xaropes
- Purês
- Sucos
- Garnishes
- Batch cocktails
- Outros preparos feitos pela equipa do bar

A ideia principal é permitir que a equipa veja rapidamente:

- Quais preparos estão vencidos
- Quais vencem hoje
- Quais vencem em breve
- Quais ainda estão dentro da validade
- Quem foi o responsável pelo preparo
- Quando foi feito
- Quando vence
- Em qual área do bar está localizado

No futuro, o app poderá ter:

- Cadastro real de preparos
- QR Code por área
- Controle de estoque
- Notificações push
- Escalas de trabalho
- Área para bar manager e gerente

---

## 3. Stack sugerida

Usar:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui, se fizer sentido
- Lucide React para ícones
- PWA configurável posteriormente

Por enquanto, pode iniciar como um projeto Next.js normal, mas com estrutura pensada para PWA.

---

## 4. Estilo visual desejado

O app deve ter visual moderno, escuro e profissional, inspirado em dashboards SaaS/mobile.

Direção visual:

- Tema dark
- Layout mobile-first
- Cards arredondados
- Cores por status
- Boa leitura no celular
- Interface simples para uso rápido em ambiente de bar
- Estilo premium, mas funcional

Cores sugeridas:

- Background principal: preto ou azul/preto escuro
- Cards: cinza escuro translúcido
- Cor primária: roxo ou verde
- Vencido: vermelho
- Vence hoje: laranja/amarelo
- Vence em breve: amarelo
- OK: verde

---

## 5. Estrutura inicial de rotas

Criar as seguintes páginas:

```txt
/
```

Redireciona para `/dashboard`.

```txt
/dashboard
```

Tela principal do app.

```txt
/preps
```

Lista de preparos.

```txt
/preps/new
```

Tela visual de novo preparo, por enquanto sem persistência real.

```txt
/alerts
```

Lista de alertas.

```txt
/stock
```

Tela placeholder para estoque.

```txt
/settings
```

Tela placeholder de configurações.

---

## 6. Layout principal

Criar um layout base com:

### Mobile

Bottom navigation com:

- Início
- Preparos
- Novo Preparo
- Estoque
- Mais

### Desktop/tablet

Sidebar lateral com:

- Logo/nome do app
- Início
- Preparos
- Novo Preparo
- Estoque
- Alertas
- Relatórios
- Configurações
- Perfil do usuário
- Seletor de área/unidade

O app deve funcionar bem em mobile, mas também ficar bonito em desktop.

---

## 7. Nome provisório do app

Usar temporariamente:

```txt
Bar Control
```

Subtítulo/conceito:

```txt
Controle de validade e preparos do bar
```

---

## 8. Tela principal: Dashboard

A tela `/dashboard` deve exibir:

### Header

Exemplo:

```txt
Olá, João!
Aqui está o resumo do seu bar hoje.
```

Botões no topo:

- Ícone de notificações com contador
- Botão “Escanear QR Code” ou “Acesso rápido”
- Botão flutuante de “Novo preparo” no mobile

---

## 9. Cards de resumo

Criar quatro cards principais:

### Card 1 — Vencidos

```txt
Título: Vencidos
Valor: 2
Descrição: Itens vencidos
Cor: vermelho
```

### Card 2 — Vencem hoje

```txt
Título: Vencem hoje
Valor: 3
Descrição: Itens vencem hoje
Cor: laranja/amarelo
```

### Card 3 — Vencem em breve

```txt
Título: Vencem em breve
Valor: 4
Descrição: Próximos 2 dias
Cor: amarelo
```

### Card 4 — OK

```txt
Título: OK
Valor: 7
Descrição: Dentro da validade
Cor: verde
```

No mobile, os cards podem ficar em grid 2x2.

No desktop, em uma linha com 4 colunas.

---

## 10. Seção de alertas importantes

Criar uma seção chamada:

```txt
Alertas importantes
```

Com botão/link:

```txt
Ver todos
```

Exibir cards/lista com os alertas mais importantes.

Dados mockados:

```ts
const alerts = [
  {
    id: "1",
    productName: "Purê de Morango",
    message: "Venceu em: 21/06/2026",
    area: "Bar Principal",
    status: "expired"
  },
  {
    id: "2",
    productName: "Xarope de Gengibre",
    message: "Vence hoje: 30/06/2026",
    area: "Bar Principal",
    status: "expires_today"
  },
  {
    id: "3",
    productName: "Suco de Limão",
    message: "Vence amanhã: 01/07/2026",
    area: "Bar Principal",
    status: "expires_soon"
  }
];
```

Visual dos status:

```txt
expired -> VENCIDO
expires_today -> VENCE HOJE
expires_soon -> VENCE EM 1 DIA
valid -> OK
```

---

## 11. Seção de preparos ativos

Criar uma seção chamada:

```txt
Preparos ativos
```

Com botão/link:

```txt
Ver todos
```

Cada item deve mostrar:

- Nome do preparo
- Data em que foi feito
- Responsável
- Validade
- Status
- Área
- Ícone
- Ação de abrir detalhes, mesmo que ainda não exista tela real

Dados mockados:

```ts
const activePreps = [
  {
    id: "1",
    name: "Xarope de Açúcar",
    category: "Syrup",
    madeAt: "22/06/2026",
    expiresAt: "07/07/2026",
    responsible: "João",
    area: "Bar Principal",
    status: "valid",
    daysRemaining: 7
  },
  {
    id: "2",
    name: "Xarope de Gengibre",
    category: "Syrup",
    madeAt: "29/06/2026",
    expiresAt: "30/06/2026",
    responsible: "Maria",
    area: "Bar Principal",
    status: "expires_today",
    daysRemaining: 0
  },
  {
    id: "3",
    name: "Suco de Limão",
    category: "Juice",
    madeAt: "29/06/2026",
    expiresAt: "01/07/2026",
    responsible: "João",
    area: "Bar Principal",
    status: "expires_soon",
    daysRemaining: 1
  },
  {
    id: "4",
    name: "Xarope de Baunilha",
    category: "Syrup",
    madeAt: "27/06/2026",
    expiresAt: "05/07/2026",
    responsible: "Lucas",
    area: "Bar Principal",
    status: "valid",
    daysRemaining: 5
  },
  {
    id: "5",
    name: "Xarope de Hortelã",
    category: "Syrup",
    madeAt: "28/06/2026",
    expiresAt: "07/07/2026",
    responsible: "João",
    area: "Bar Principal",
    status: "valid",
    daysRemaining: 7
  }
];
```

---

## 12. Página `/preps`

Criar uma tela de lista de preparos com:

- Campo de busca
- Filtros por status
- Lista de preparos
- Botão para novo preparo

Filtros:

```txt
Todos
Vencidos
Vencem hoje
Vencem em breve
OK
Consumidos
Descartados
```

Por enquanto, usar os mesmos mocks.

---

## 13. Página `/preps/new`

Criar uma tela visual de cadastro de novo preparo.

Campos:

- Produto/preparo
- Categoria
- Área
- Responsável
- Data de preparo
- Validade em dias
- Quantidade
- Unidade
- Observações

Botão:

```txt
Salvar preparo
```

Ao clicar, por enquanto pode apenas mostrar um toast ou alert:

```txt
Preparo criado com sucesso. Dados mockados por enquanto.
```

Não precisa persistir ainda.

---

## 14. Página `/alerts`

Criar uma lista completa de alertas.

Separar por seções:

```txt
Vencidos
Vencem hoje
Vencem em breve
```

Cada alerta deve ter:

- Nome do preparo
- Mensagem
- Área
- Status
- Responsável, se disponível

---

## 15. Página `/stock`

Criar tela placeholder para estoque.

Mensagem:

```txt
Controle de estoque em breve
```

Adicionar alguns cards mockados para dar visão futura:

```ts
const stockItems = [
  {
    id: "1",
    name: "Coca-Cola Zero",
    category: "Soft Drink",
    currentQuantity: 8,
    minimumQuantity: 12,
    unit: "garrafas",
    status: "low_stock"
  },
  {
    id: "2",
    name: "Gin Tanqueray",
    category: "Spirit",
    currentQuantity: 2,
    minimumQuantity: 3,
    unit: "garrafas",
    status: "low_stock"
  },
  {
    id: "3",
    name: "Água Tônica",
    category: "Soft Drink",
    currentQuantity: 24,
    minimumQuantity: 10,
    unit: "unidades",
    status: "ok"
  }
];
```

---

## 16. Página `/settings`

Criar tela placeholder com:

- Perfil do usuário
- Área atual
- Tema
- Preferências de notificação
- Dados da unidade

Por enquanto, tudo visual.

---

## 17. Componentes sugeridos

Criar componentes reutilizáveis:

```txt
AppLayout
Sidebar
BottomNavigation
DashboardCard
AlertItem
PrepItem
StatusBadge
PageHeader
FloatingActionButton
SearchInput
FilterTabs
EmptyState
```

---

## 18. Tipos TypeScript

Criar tipos iniciais:

```ts
export type PrepStatus = 
  | "expired"
  | "expires_today"
  | "expires_soon"
  | "valid"
  | "consumed"
  | "discarded";

export type PrepCategory =
  | "Syrup"
  | "Puree"
  | "Juice"
  | "Garnish"
  | "BatchCocktail"
  | "Other";

export interface Prep {
  id: string;
  name: string;
  category: PrepCategory;
  madeAt: string;
  expiresAt: string;
  responsible: string;
  area: string;
  status: PrepStatus;
  daysRemaining: number;
  quantity?: number;
  unit?: string;
  notes?: string;
}

export interface Alert {
  id: string;
  productName: string;
  message: string;
  area: string;
  status: PrepStatus;
}

export interface DashboardSummary {
  expired: number;
  expiresToday: number;
  expiresSoon: number;
  valid: number;
}
```

---

## 19. Organização sugerida de pastas

```txt
src/
  app/
    dashboard/
      page.tsx
    preps/
      page.tsx
      new/
        page.tsx
    alerts/
      page.tsx
    stock/
      page.tsx
    settings/
      page.tsx
    layout.tsx
    page.tsx

  components/
    layout/
      AppLayout.tsx
      Sidebar.tsx
      BottomNavigation.tsx
    dashboard/
      DashboardCard.tsx
    preps/
      PrepItem.tsx
      PrepList.tsx
    alerts/
      AlertItem.tsx
    ui/
      StatusBadge.tsx
      PageHeader.tsx
      FilterTabs.tsx
      SearchInput.tsx
      FloatingActionButton.tsx
      EmptyState.tsx

  data/
    mockDashboard.ts
    mockPreps.ts
    mockAlerts.ts
    mockStock.ts

  types/
    prep.ts
    stock.ts
    dashboard.ts

  lib/
    status.ts
    dates.ts
```

---

## 20. Regras de status

Criar helpers para status:

```ts
export function getStatusLabel(status: PrepStatus): string {
  switch (status) {
    case "expired":
      return "Vencido";
    case "expires_today":
      return "Vence hoje";
    case "expires_soon":
      return "Vence em breve";
    case "valid":
      return "OK";
    case "consumed":
      return "Consumido";
    case "discarded":
      return "Descartado";
    default:
      return "Desconhecido";
  }
}
```

Criar também helpers de cor/classe:

```ts
export function getStatusClass(status: PrepStatus): string {
  switch (status) {
    case "expired":
      return "bg-red-500/15 text-red-400 border-red-500/30";
    case "expires_today":
      return "bg-orange-500/15 text-orange-400 border-orange-500/30";
    case "expires_soon":
      return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
    case "valid":
      return "bg-green-500/15 text-green-400 border-green-500/30";
    case "consumed":
      return "bg-blue-500/15 text-blue-400 border-blue-500/30";
    case "discarded":
      return "bg-zinc-500/15 text-zinc-400 border-zinc-500/30";
    default:
      return "bg-zinc-500/15 text-zinc-400 border-zinc-500/30";
  }
}
```

---

## 21. Critérios de aceite da primeira entrega

A primeira entrega deve conter:

- Projeto Next.js rodando
- Dashboard `/dashboard` funcional com dados mockados
- Layout responsivo mobile/desktop
- Navegação inferior no mobile
- Sidebar no desktop
- Cards de resumo
- Lista de alertas
- Lista de preparos ativos
- Página `/preps` com filtros visuais
- Página `/preps/new` com formulário visual
- Página `/alerts`
- Página `/stock` placeholder
- Página `/settings` placeholder
- Código organizado em componentes reutilizáveis
- Nenhuma integração com backend ainda

---

## 22. O que não implementar agora

Não implementar nesta fase:

- Backend
- Banco de dados
- Login real
- Permissões reais
- Push notification
- QR Code real
- Impressão de etiquetas
- Pagamentos
- Escala de funcionários
- Relatórios avançados
- Multi-unidades real

Esses pontos ficam para as próximas fases.

---

## 23. Objetivo final desta etapa

Ao final desta etapa, precisamos ter um protótipo funcional navegável, com visual próximo de um produto real, que permita validar a experiência principal:

```txt
O usuário abre o app e entende rapidamente o estado dos preparos do bar.
```

A prioridade é experiência visual, clareza das informações e estrutura preparada para evoluir.
