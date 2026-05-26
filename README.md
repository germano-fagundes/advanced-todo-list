# Advanced Todo List

Aplicação de lista de tarefas desenvolvida com Meteor, React e Material UI. O projeto reúne autenticação de usuários, cadastro e edição de tarefas, perfil com foto e informações pessoais, além de um painel com indicadores resumidos.

## Sumário

- [Sinopse](#sinopse)
- [Instalação](#instalação)
- [Inicialização](#inicialização)
- [Funcionalidades](#funcionalidades)
- [Scripts úteis](#scripts-úteis)

## Sinopse

A aplicação foi pensada para organizar tarefas com uma interface moderna e responsiva. Após o login, o usuário acessa um dashboard com contadores de tarefas, pode criar novas tarefas, filtrar e visualizar a lista, editar registros existentes, alterar o status de execução e consultar o próprio perfil.

## Instalação

1. Instale o [Meteor](https://www.meteor.com/install), caso ainda não esteja disponível na sua máquina.
2. Dentro da raiz do projeto, instale as dependências:

```bash
meteor npm install
```

## Inicialização

Para executar a aplicação em modo de desenvolvimento:

```bash
meteor run
```

Depois disso, abra o endereço exibido no terminal, normalmente `http://localhost:3000`.

## Funcionalidades

- Cadastro de usuários com nome, sobrenome, e-mail, senha, data de nascimento, gênero, empresa e foto de perfil.
- Login e logout de sessão com Meteor Accounts.
- Tela inicial com saudação personalizada e menu lateral.
- Dashboard com contagem de tarefas por status: cadastradas, em andamento, concluídas e total geral.
- Cadastro de tarefas com ícone, título, descrição, data de vencimento e indicação de tarefa pessoal.
- Listagem de tarefas com filtro por texto e alternância para exibir ou ocultar tarefas concluídas.
- Edição de tarefas existentes e alteração de status entre cadastrada, em andamento e concluída.
- Exclusão de tarefas.
- Página de perfil com foto e dados do usuário autenticado.
- Interface responsiva construída com React Router e Material UI.

## Scripts úteis

- `meteor run` - inicia a aplicação.
