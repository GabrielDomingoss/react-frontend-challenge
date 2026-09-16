# Arquitetura

O Libris foi organizado usando uma estrutura inspirada em Feature-Sliced Design, mas sem seguir o padrão de forma rígida.

A ideia foi separar responsabilidades por domínio e manter a estrutura simples o suficiente para o tamanho do projeto.

## Estrutura

```text
src/
├── app/
│   └── layouts/
├── routes/
├── pages/
├── features/
│   ├── auth/
│   ├── book-search/
│   ├── shelf/
│   └── theme/
├── entities/
│   └── book/
├── shared/
│   ├── api/
│   ├── hooks/
│   └── lib/
├── components/
│   └── ui/
├── main.tsx
└── index.css
```

### `app`

Contém elementos globais da aplicação, como layouts compartilhados.

### `routes`

Rotas do TanStack Router.

As páginas autenticadas ficam abaixo de uma rota protegida, que verifica a sessão no `beforeLoad`.

### `pages`

Composição das telas da aplicação:

- login;
- descoberta;
- estante;
- detalhes do livro.

As páginas consomem componentes e regras das outras camadas, evitando concentrar lógica de negócio.

### `features`

Funcionalidades executadas pelo usuário.

Atualmente:

- `auth`: login e sessão;
- `book-search`: formulário e filtros da pesquisa;
- `shelf`: gerenciamento da estante;
- `theme`: tema claro/escuro.

### `entities/book`

Código relacionado à entidade livro:

```text
book/
├── api/
├── lib/
├── model/
└── ui/
```

Aqui ficam os tipos, chamadas para a Google Books API, queries, mapper e componentes relacionados ao livro.

### `shared`

Código que pode ser reutilizado por diferentes partes da aplicação, como o cliente Axios e hooks genéricos.

### `components/ui`

Componentes base do Shadcn/UI.

## Estado

Foram usadas duas abordagens diferentes de acordo com o tipo de estado.

### TanStack Query

Responsável pelos dados vindos da Google Books API.

Exemplos de query keys:

```ts
["books", "search", params]
```

```ts
["books", "details", bookId]
```

O TanStack Query cuida do cache e dos estados de carregamento e erro dessas requisições.

### Zustand

Usado para os estados locais que precisam continuar disponíveis após um refresh:

- sessão;
- estante;
- tema.

Os stores utilizam o middleware `persist`.

## Google Books API

As requisições são feitas com Axios.

Busca:

```text
GET /volumes
```

Detalhes:

```text
GET /volumes/{bookId}
```

A aplicação aceita uma chave opcional através de:

```env
VITE_GOOGLE_BOOKS_API_KEY=
```

A API funciona sem chave em alguns cenários, mas durante o desenvolvimento foram encontrados limites de requisição em acessos anônimos. Por isso o suporte à chave foi mantido.

## Mapper

Os componentes não trabalham diretamente com o objeto retornado pela Google Books API.

O retorno é convertido para `IBook` pelo `mapGoogleBook`.

```text
Google Books API -> IGoogleBookVolume -> mapGoogleBook ->IBook
```

Isso também centraliza o tratamento de campos que nem sempre vêm preenchidos, como:

- autores;
- capa;
- descrição;
- editora;
- data de publicação.

O mapper também normaliza URLs de thumbnails que chegam usando HTTP.

## Autenticação

A autenticação é simulada, conforme solicitado no desafio.

O formulário usa TanStack Form e Zod.

Validações:

- e-mail válido;
- senha com mais de 6 caracteres.

Após o login é criado um token fictício e a sessão é armazenada no Zustand.

A senha não é persistida.

## Estante

A estante também usa Zustand com persistência.

Cada livro pode possuir um dos seguintes status:

- Quero ler;
- Lendo;
- Concluído.

A listagem utiliza TanStack Table e permite ordenação por título e status.

## Tema

O tema claro/escuro é armazenado no Zustand.

Um componente de sincronização aplica ou remove a classe `dark` no elemento `html`, deixando o Tailwind e os tokens do Shadcn responsáveis pelas cores.

## Testes

Os testes foram concentrados nas regras que têm mais impacto na aplicação:

- validação do login;
- mapper da Google Books API;
- tratamento de campos opcionais;
- inclusão de livros na estante;
- prevenção de duplicidade;
- alteração de status;
- remoção de livros.

Foi priorizado testar regras e transformações em vez de detalhes puramente visuais.