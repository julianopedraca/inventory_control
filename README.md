# Stockontroll

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
   make start
   ```

3. Em um terminal rode o comando:
   ```bash
   php artisan serve
   ```

4. Em outro terminal rode o comando:
   ```bash
   npm run dev
   ```


6. Acesse a aplicação em: [http://localhost:8000](http://localhost:8000)

## 🚀 Comandos Úteis (Makefile)

| Comando          | Descrição                                  |
|------------------|-------------------------------------------|
| `make start`   | Instala todas as dependências, adiciona as migrations, adiciona os seeders, cria arquivo .env, gera token jwt            |

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