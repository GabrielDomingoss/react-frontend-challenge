# Libris

Aplicação de biblioteca pessoal construída em React utilizando a Google Books API.

## Funcionalidades

- login simulado;
- sessão persistida;
- rotas protegidas;
- pesquisa de livros;
- debounce na pesquisa;
- filtros por tipo;
- ordenação por relevância ou data;
- paginação;
- detalhes do livro;
- preview no Google Books;
- estante persistida;
- status de leitura;
- ordenação da estante;
- tema claro e escuro;
- layout responsivo.

## Tecnologias

- React
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- TanStack Form
- TanStack Table
- Zustand
- Zod
- Axios
- Tailwind CSS
- Shadcn/UI
- Vitest
- React Testing Library

## Instalação

```bash
npm install
```

Depois:

```bash
npm run dev
```

Por padrão, o Vite inicia a aplicação em:

```text
http://localhost:5173
```

## Variáveis de ambiente

A chave da Google Books API é opcional.

A aplicação também consegue realizar chamadas sem uma chave, porém a Google pode aplicar limites mais restritivos para requisições anônimas.

Caso queira utilizar uma chave própria, ela pode ser criada pelo Google Cloud Console.

### Criando uma chave da Google Books API

1. Acesse o Google Cloud Console.
2. Crie um projeto ou selecione um projeto existente.
3. Acesse **APIs e serviços**.
4. Habilite a **Books API** para o projeto.
5. Acesse **APIs e serviços > Credenciais**.
6. Selecione **Criar credenciais > Chave de API**.
7. Copie a chave gerada.

Depois, crie um arquivo `.env` na raiz do projeto:

```env
VITE_GOOGLE_BOOKS_API_KEY=sua_chave
```

O projeto contém um `.env.example` com a variável esperada:

```env
VITE_GOOGLE_BOOKS_API_KEY=
```

Após alterar o `.env`, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Login

A autenticação é simulada.

Pode ser utilizado qualquer e-mail válido e uma senha com mais de 6 caracteres.

Exemplo:

```text
E-mail: teste@email.com
Senha: 1234567
```

A senha não é armazenada.

## Pesquisa

Após o login, a aplicação abre a tela de descoberta.

É possível pesquisar por título, autor ou assunto.

Filtros disponíveis:

- Todos;
- Livros;
- Revistas.

Ordenações disponíveis:

- Relevância;
- Mais recentes.

A pesquisa utiliza debounce antes de consultar a Google Books API.

## Detalhes

Ao abrir um livro, são exibidos os dados disponíveis na API, como:

- título;
- autores;
- capa;
- editora;
- data de publicação;
- descrição;
- link para preview.

Nem todos os livros possuem todos esses campos. A interface trata esses casos sem exibir imagens ou informações quebradas.

## Estante

Um livro pode ser adicionado à estante com um dos seguintes status:

- Quero ler;
- Lendo;
- Concluído.

Na tela da estante é possível:

- alterar o status;
- ordenar por título;
- ordenar por status;
- abrir os detalhes;
- remover o livro.

A estante é persistida no navegador.

## Tema

O tema claro ou escuro também é persistido.

Após atualizar a página, a preferência selecionada continua ativa.

## Testes

Executar em modo watch:

```bash
npm run test
```

Executar uma vez:

```bash
npm run test:run
```

## Lint

```bash
npm run lint
```

## Build

```bash
npm run build
```

## Arquitetura

As decisões de organização e responsabilidades do projeto estão descritas em:

```text
ARCHITECTURE.md
```