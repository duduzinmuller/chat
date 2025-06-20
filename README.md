# 💬 Chat App

Aplicativo de chat em tempo real com autenticação e controle de usuários. Desenvolvido com Node.js e PostgreSQL, focado em escalabilidade, segurança e estruturação clara do backend.

## 🚀 Tecnologias

- Node.js
- Express
- PostgreSQL
- Prisma
- Docker
- JWT (JSON Web Tokens)
- UUID
- Bcrypt
- Validator

## 📁 Estrutura de Pastas

src/
├── controllers/
├── repositories/
├── useCases/
├── helpers/
├── middlewares/
├── routes/
├── services/
└── index.ts

markdown
Copiar
Editar

## ⚙️ Funcionalidades

- Criação de contas com ou sem imagem
- Login com e-mail/senha ou social (Google, Facebook)
- Criação e listagem de mensagens
- Autenticação via JWT (access/refresh tokens)
- Proteção de rotas e verificação de permissões (admin)
- Banco de dados PostgreSQL com Docker

## 🐳 Rodando com Docker

```bash
docker-compose up -d
Certifique-se de configurar o .env antes.

📄 Variáveis de Ambiente
Crie um arquivo .env com:

env
Copiar
Editar
PORT=8000
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_db
JWT_ACCESS_TOKEN_SECRET=sua_chave
JWT_REFRESH_TOKEN_SECRET=sua_chave_refresh
🧪 Testando a API
Você pode usar o Postman ou Insomnia para testar os endpoints. Veja exemplos em:

POST /users - cria novo usuário

POST /login - autentica usuário

POST /messages - envia mensagem

GET /messages - lista mensagens

🛡️ Segurança
Senhas criptografadas com Bcrypt

Tokens JWT com expiração e refresh

Verificação de role admin em rotas protegidas

👨‍💻 Autor
Desenvolvido por Eduardo Muller

