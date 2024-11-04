Este é um projeto de um dashboard de dados dos episódios de Rick and Morty com uma página de login

# Inicializando o projeto

```bash
yarn install

yarn dev
```

Abrir em [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar.

# Estrutura do Projeto

```bash
/src
├── /ui
│   └── /components      # componentes reutilizáveis
├── /hooks               # hooks para o gerenciamento do dashboard
├── /libs
│   └── /session         # gerenciamento da sessão do usuário (criar, deletar, cryptografar)
│   └── /utils           # funções de utilidade/helpers
│   └── /definitions     # definição dos tipos utilizados
├── /login               # página e ações server-side (login/logout) para a página de login
├── /dashboard           # página e ações server-side (chamadas à API) para odashboard
```

# Testando login

Como não foi pedido uma página de cadastro, há uma lista de mock-users que são credenciados para fazer o login.
Você pode escolher qualquer um daqueles users ou até adicionar mais lá e o login deverá ser realizado.

Para facilitar aqui está um login já cadastrado:

** `usuario@codako.com` **
** `98765432` **

O login possui um schema de verificação para e-mail e senha, mas para a segurança do usuário, a mensagem de erro não indica qual é o campo com erro.

A sessão do usuário é guardado em um cookie que é deletado ao realizar o logout de dentro do dashboard.

Se o usuário tenta acessar o dashboard sem estar com uma sessão ativa, o middleware redireciona à página de login

# Usando gráficos

Este projeto utiliza da biblioteca [Nivo](https://nivo.rocks/) para a exibição dos gráficos

Este projeto inclui três componentes principais para visualização de dados: BarChart, LineChart e GaugeChart. Cada componente aceita parâmetros específicos e requer dados formatados de uma maneira específica para funcionar corretamente.

1. BarChart

**Formatação:**
Array<{
data: [{[key]: value}]
}>

Exemplo:

```json
[{ "Categoria 1": 10 }, { "Categoria 2": 20 }]
```

Importante notar: os dados processados pelos gráficos são enviados pelo useDashboardChart, e não como um prop direto

**Props:**
endpoint (string): o nome do endpoint pelo qual o gráfico receberá os dados
keys (string): as chaves para o gráfico encontrar os valores a serem exibidos
indexBy (string): A chave pela qual os dados serão classificados e que aparecerá nas legendas

2. LineChart

**Formatação:**
Array<{
id: string | number # nome da linha classificada
data: Array<{
x: number | string | Date # legenda que aparecerá no eixo x do gráfico
y: number | string | Date # valor que classificará o x no eixo y do gráfico
}>
}>

Exemplo:

```json
[
  {
    "id": "transporte",
    "color": "hsl(56, 70%, 50%)",
    "data": [
      {
        "x": "aviao",
        "y": 146
      },
      {
        "x": "helicoptero",
        "y": 151
      },
      {
        "x": "barco",
        "y": 51
      }
    ]
  }
]
```

Importante notar: os dados processados pelos gráficos são enviados pelo useDashboardChart, e não como um prop direto

**Props:**
endpoint (string): o nome do endpoint pelo qual o gráfico receberá os dados

3. GaugeChart

**Formatação:**
Array<{
id: string | number,
value: number
}>

Exemplo:

```json
[
  {
    "id": "ruby",
    "label": "ruby",
    "value": 38,
    "color": "hsl(262, 70%, 50%)"
  },
  {
    "id": "python",
    "label": "python",
    "value": 388,
    "color": "hsl(349, 70%, 50%)"
  }
]
```

Importante notar: os dados processados pelos gráficos são enviados pelo useDashboardChart, e não como um prop direto

**Props:**
endpoint (string): o nome do endpoint pelo qual o gráfico receberá os dados
filter (string): futuramente será implementado para oferecer interatividade nas chamadas dos dados

# Próximos passos

- [ ] Implementar um componente filtro para filtrar dados exibidos nos gráficos
- [ ] Testes unitários
- [ ] Implementar a página de cadastro
- [ ] Implementar a autenticação com o banco de dados
- [ ] Melhorar performance de carregamento
