#  Relatório do Projeto: Aplicação Web utilizando NoSQL (PouchDB)

## Alunos:
- Antônio Luiz da Silva Neto
- Matheus Tenório de Farias

##  Tema

O projeto tem como tema a criação de uma aplicação web que realiza o gerenciamento de perfis de usuários utilizando um banco de dados NoSQL, especificamente o **PouchDB**.

---

##  Tecnologias Utilizadas

- **HTML5**: Estrutura da interface da aplicação.
- **CSS3**: Estilização responsiva e moderna para uma melhor experiência do usuário.
- **JavaScript**: Lógica de manipulação de dados e eventos da interface.
- **PouchDB (NoSQL)**: Armazenamento local baseado em documentos JSON, com possibilidade de replicação e funcionamento offline.

---

##  Descrição da Aplicação

A aplicação permite:

- Cadastrar novos usuários com informações como username, e-mail e preferências.
- Listar todos os usuários cadastrados.
- Visualizar, editar ou deletar perfis de usuários.
- Armazenar e atualizar as informações localmente utilizando PouchDB.
- Adicionar configurações de tema e preferências de notificação.

---

##  Uso do Banco de Dados NoSQL (PouchDB)

### Por que é NoSQL?

- Armazenamento em documentos JSON.
- Não possui esquemas fixos.
- Cada usuário é um documento independente identificado por um `_id` único.
- Suporte para operações offline.
- Permite expansão fácil de estrutura sem alterações complexas de schema.

Os dados dos usuários são inseridos no banco de dados como documentos JSON, por exemplo:

```javascript
const newUser = {
    _id: userId,
    username: username,
    email: email,
    nomeCompleto: document.getElementById('nomeCompleto').value,
    preferencias: {
        temaApp: document.getElementById('temaApp').value,
        notificacoesEmail: true,
        idioma: 'pt-BR',
        notificacoesPush: false,
        interesses: [],
        configuracoesPrivacidade: {
            perfilPublico: true,
            mostrarEmail: false
        }
    },
    dataCriacao: new Date().toISOString(),
    dataAtualizacao: new Date().toISOString()
};
await db.put(newUser);
```

Esse é um exemplo direto de utilização do paradigma NoSQL, onde os dados são armazenados como documentos flexíveis, e não como linhas em tabelas relacionais.

---

##  Funcionalidades Implementadas

### 1. Cadastro de Usuários
- Prevenção de duplicidade por username e email.
- Salva os dados como documento no PouchDB.

### 2. Listagem e Interface
- Lista os usuários com seus dados essenciais.
- Interface moderna, responsiva e com destaque visual.

### 3. Edição e Atualização
- Recupera e exibe os dados do usuário selecionado.
- Permite edição e salva novamente no banco PouchDB.

### 4. Deleção de Usuários
- Remove documentos diretamente do PouchDB.
- Confirmação de exclusão para evitar remoções acidentais.

### 5. Notificações e Preferências
- Preferência de tema claro/escuro.
- Configuração de notificações por e-mail.
- Estrutura modular para expansão futura (como privacidade, push, interesses, etc).

### 6. Exibição de Última Atualização
- Mostra dinamicamente a data e hora da última operação com usuários.

---

## Estrutura e Organização

A página está dividida em seções principais que organizam os conteúdos de forma lógica:

- Um cabeçalho com o título da aplicação que apresenta ao usuário o propósito da ferramenta.
- Um formulário para cadastro de novos usuários, contendo campos essenciais como nome de usuário, email, nome completo e opções de preferências (tema da aplicação). Este formulário é intuitivo, com campos obrigatórios para garantir a entrada correta dos dados.
- Uma seção que exibe a lista dos usuários cadastrados, a qual é atualizada dinamicamente via JavaScript, permitindo que o usuário visualize rapidamente os registros armazenados.
- Uma área para exibição e edição detalhada do perfil do usuário selecionado, com campos para modificar informações, alterar preferências e executar a exclusão do registro, possibilitando uma gestão completa dos dados.

## Usabilidade e Acessibilidade

O HTML foi estruturado com o uso de elementos semânticos, como `<header>`, `<main>`, `<section>` e `<form>`, promovendo melhor acessibilidade e legibilidade do código. Os formulários utilizam atributos como `required` para validação básica, garantindo que dados essenciais sejam preenchidos antes do envio.

## Integração com CSS e JavaScript

O arquivo referencia uma folha de estilos externa para o design visual e o arquivo `script.js` para a lógica do aplicativo. Essa separação de responsabilidades contribui para um código mais limpo e manutenção facilitada.

## Responsividade

Embora o arquivo HTML em si não contenha regras de estilo, sua estrutura facilita a aplicação de técnicas responsivas pelo CSS, possibilitando uma boa experiência em diferentes dispositivos e tamanhos de tela.

---

##  Interface (CSS)

Estilo moderno com:

- Cores suaves e design amigável.
- Sombras e efeitos de hover.
- Responsividade para dispositivos móveis.
- Animações leves (fade-in, pulse).

Classes para mensagens de sucesso e erro também foram utilizadas.

---

## Diferenciais

-  Armazenamento completamente local e offline.
-  Flexibilidade de estrutura típica de NoSQL.
-  Fácil de integrar com CouchDB se desejar replicação com servidor no futuro.
-  Uso real de um banco NoSQL em ambiente web, sem necessidade de backend.

---

##  Possíveis Melhorias Futuras

- Adicionar busca e filtros por nome ou e-mail.
- Exportação/importação de dados.
- Sincronização com CouchDB para replicação online.
- Adição de autenticação básica por senha.

---

##  Conclusão

Este projeto demonstra de forma clara e funcional como é possível desenvolver uma aplicação web completa usando tecnologia NoSQL, no caso o **PouchDB**, diretamente no navegador.  
Ele é uma excelente base para sistemas maiores que demandem armazenamento flexível, operação offline e estrutura modular de dados.
