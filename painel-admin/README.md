Este é um projeto de um dashboard de dados dos episódios de Rick and Morty com uma página de login

## Inicializando o projeto

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Estrutura do Projeto

```bash
/src
├── /components          # Reusable components
│   └── /DashboardChart  # Your dashboard chart component
├── /hooks               # Custom hooks, e.g., useDashboardChart
├── /libs                # Shared utility functions
│   └── /services        # API calls & service functions for data handling
│       └── dashboardService.ts
├── /pages               # Next.js pages
└── /utils               # Utility functions, error handlers, helpers
```

## Testando login

Como não foi pedido uma página de cadastro, há uma lista de mock-users que são credenciados para fazer o login.
Você pode escolher qualquer um daqueles users ou até adicionar mais lá e o login deverá ser realizado.
