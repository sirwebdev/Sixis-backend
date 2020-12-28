# :six: Sixis :six:

## :memo: Mapeamento das Features

<br>

### Login

<br>

**RF**

-   [x] O usuário deve poder fazer login com seu e-mail;
-   [x] O usuário deve poder criar sua conta;

**RNF**

-   [x] Utilizar o JWT para criar uma sessão;

**RN**

-   [x] Para logar o e-mail deve existir no banco de dados;
-   [x] Para criar uma conta o admin deve conter um e-mail inexistente no banco de dados;

<br>

### Painel do admin

<br>

**RF**

-   [ ] O admin deve poder criar uma postagem;
-   [ ] O admin deve poder deletar uma postagem;

**RNF**

**RN**

-   [ ] Para a criação de uma postagem devem conter obrigatóriamente titulo, banner e o conteúdo;
-   [ ] Ao deletar a postagem deletar o arquivo de upload armazenado;

<br>

### Upload de imagens

<br>

**RF**

-   [ ] O admin deve poder fazer um upload de foto;

**RNF**

-   [ ] Utilizar o multer para o upload de arquivos;

**RN**

-   [ ] Na criação deve alterar o nome do arquivo para uma hash aleatória + a extensão do arquivo
-   [ ] Quando excluir um arquivo, excluir também da pasta temp;

<br>

### Painel do usuário

<br>

**RF**

-   [ ] O usuario deve poder listar todas as postagens existentes;
-   [ ] O usuário deve poder vizualizar uma postagem específica;

**RNF**

**RN**

-   [ ] Para vizualizar uma postagem especifica, ter refência do id;
