# Projeto de Gerenciamento de Tarefas

Este é um projeto desenvolvido para um processo seletivo, apresentando uma aplicação de gerenciamento de tarefas que permite criação, edição, exclusão, reordenação e validação de tarefas. A interface foi construída com React e o back-end com Node.js e Express. O projeto está disponível online, com o front-end no Netlify e o back-end no Render.

## 🛠 Funcionalidades

- **Adicionar Tarefa**: Cadastro de novas tarefas com validação de nome, custo e prazo.
- **Validação de Nomes**: Verificação de duplicidade do nome, independente de letras maiúsculas/minúsculas, exibindo um alerta de erro se já estiver cadastrado.
- **Editar Tarefas**: Permite edição dos dados das tarefas; ao tentar usar um nome já existente, exibe uma mensagem de erro.
- **Exclusão de Tarefas**: Exclui tarefas com um clique no ícone de exclusão.
- **Reordenação**: Reordenação de tarefas via drag-and-drop, com persistência da nova ordem no banco de dados.
- **Destaque de Itens de Alto Custo**: Tarefas com custo acima de R$ 900 são destacadas visualmente.

## 🚀 Deploy

### Links do Deploy
- **Front-end (Netlify)**: [[Link para o Netlify](https://controle-de-tarefas.netlify.app/)](#)
- **Back-end (Render)**: [[Link para o Render](https://taskmanager-backend-vh5d.onrender.com)](#)

### Repositório no GitHub
- [[Link para o repositório](https://github.com/MarcioBADias/task-manager)](#)

## 🛠 Tecnologias Utilizadas

### Front-end
- **React**: Para a interface do usuário.
- **Vite**: Para otimização de desenvolvimento e build.
- **Styled Components**: Para estilização modular dos componentes.
- **react-beautiful-dnd**: Para reordenação de tarefas com drag-and-drop.

### Back-end
- **Node.js e Express**: Para a API RESTful.
- **MongoDB**: Banco de dados para armazenar tarefas.
- **Mongoose**: ODM para modelagem de dados no MongoDB.

## 📦 Estrutura do Projeto

O projeto está dividido em três partes principais:

- **`frontend`**: Interface em React, com componentes estilizados e lógica para gerenciar tarefas e integração com a API.
- **`backend`**: API em Node.js para operações CRUD e validação de tarefas.
- **`database`**: Conexão e configuração do banco de dados MongoDB usando Mongoose.

## ⚙️ Configuração Local

### Pré-requisitos
- Node.js e npm
- MongoDB (ou uma instância remota)

### Deploy em Produção

O front-end está configurado para deploy no Netlify, e o back-end no Render. Configure as variáveis de ambiente em ambos os serviços conforme a documentação de cada um.

## 📜 Estrutura de Código (Front-end)

- **`TaskList`**: Componente da lista de tarefas, com funcionalidades de drag-and-drop e edição.
- **`TaskForm`**: Formulário para criação de novas tarefas.
- **`App.js`**: Componente raiz.

## 📜 Estrutura de Código (Back-end)

- **`index.js`**: Ponto de entrada da API com todas as rotas.
- **`models/Task.js`**: Modelo de dados da tarefa no MongoDB com Mongoose.
