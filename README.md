# Stockontrol

Este projeto é um sistema completo de controle de estoque. O sistema inclui autenticação de usuários com diferentes níveis de acesso, CRUD de produtos e uma interface responsiva. A API está versionada em `/api/v1/` e requer autenticação via JWT.

## 📦 Tecnologias Utilizadas

- **Backend**: Laravel 12
- **Frontend**: React + Inertia.js
- **Estilização**: Tailwind CSS + Styled-components
- **Autenticação**: JWT
- **Banco de Dados**: SQLite

## 🛠️ Configuração do Ambiente

### Pré-requisitos

- Node.js (v20.11+)
- PHP (v8.4+)
- Composer (v2.8+)

### Instalação

1. Clone o repositório:
   ```bash
   git clone git@github.com:julianopedraca/inventory_control.git
   cd inventory_control
   ```

2. Instale as dependências:
   ```bash
   make install
   ```

3. Inicie os servidores:
   ```bash
   make start
   ```

4. Acesse a aplicação em: [http://localhost:8000](http://localhost:8000)

5. Para parar os servidores:
   ```bash
   make stop
   ```

## 🚀 Comandos Úteis (Makefile)

| Comando          | Descrição                                  |
|------------------|-------------------------------------------|
| `make install`   | Instala todas as dependências, configura o ambiente e gera token JWT |
| `make start`     | Inicia os servidores Laravel e Vite       |
| `make stop`      | Para os servidores em execução            |
| `make test`      | Executa os testes com Pest PHP            |

## 👥 Usuários para Teste

| Email                     | Senha      | Perfil    |
|---------------------------|------------|-----------|
| john.doe@example.com      | password123| Admin     |
| jane.smith@example.com    | password123| Editor    |
| bob.johnson@example.com   | password123| User      |

## 🔐 Níveis de Acesso

- **Admin**: Pode criar, editar e excluir produtos
- **Editor**: Pode visualizar e atualizar estoque, mas não criar/excluir
- **User**: Apenas visualização dos produtos

## 🧪 Testes

O sistema inclui testes para:
- User (Criação de usuário)
- Product (CRUD operations)

Para executar os testes:
```bash
make test
```