# 📡📺📱 Claro Frontend

Projeto frontend em Next.js para visualização de login com tokens JWE.  
Dashboard com histórico, gráfico de acessos e ferramenta de decrypt integrada.

---

## 📁 Estrutura de Pastas

```bash
claro-frontend/
├── .github/workflows/        # Pipeline CI com GitHub Actions
├── public/                   # Assets públicos (logo, ícones etc.)
├── src/
│   ├── pages/                # Páginas principais
│   │   ├── auth/             # Layout e rota de login
│   │   ├── dashboard/        # Página principal do dashboard
│   │   ├── decrypt/          # Página de decrypt JWE
│   │   └── history/          # Página com histórico completo
│   ├── layouts/              # Layouts da aplicação (AuthLayout etc.)
│   ├── services/             # Serviços de API com Axios
│   ├── stores/               # Armazenamento global com Redux Toolkit
│   └── utils/                # Funções utilitárias e middleware
├── .env.example              # Variáveis de ambiente de exemplo
├── README.md                 # Documentação principal
└── docker-compose.yml        # Arquivo Docker


## ⚙️ Tecnologias Utilizadas

- **Next.js 15**
- **TypeScript**
- **Redux Toolkit**
- **PrimeReact**
- **Axios**
- **ESLint + Prettier**
- **Docker + Docker Compose**
- **GitHub Actions (CI)**

---

## 🧪 Testes Unitários

Os testes estão na pasta `__tests__/unit/` e cobrem:

- **Serviços** (`authService`, `historyService`, `decryptService`)
- **Stores** (`auth.store`, `history.store`)
- **Componentes de página** (`LoginPage`, `DecryptPage`, `DashboardIndex`, `HistoryPage`)

### Execute com:

```bash
pnpm run test

## 🐳 Docker

### Build e Run

```bash
docker-compose build
docker-compose up

## 📦 Variáveis de Ambiente

Crie um arquivo `.env.local` com:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

## 🔁 Pipeline de CI

CI rodando com:

- **Lint**: `pnpm run lint`
- **Testes**: `pnpm run test`
- **Build**: `pnpm run build`

Arquivo do workflow: `.github/workflows/ci.yml`

---

## 🚀 Como Rodar Localmente

```bash
pnpm install
pnpm dev

## 🧠 Observações

- Autenticação baseada em **JWE**
- Dashboard com **gráfico diário/mensal de logins**
- Decrypt de tokens **JWE** via endpoint com feedback visual

---

## 👨‍💻 Autor

**Gabriel Passaes** — [@gabriel-passaes](https://github.com/gabriel-passaes)