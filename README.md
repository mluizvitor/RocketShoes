![RocketShoes](/.github/rocketshoes.png)

# Módulo 02 - Desafio 01

Este repositório contém a resolução do terceiro desafio da trilha de ReactJS do curso Ignite.

Apresento-lhes o RocketShoes, uma loja de tênis. Como toda loja, é preciso ter um carrinho de compras, verificação de produto no estoque, fazer cálculos do subtotal e total dos produtos.

O template veio com a parte visual toda construida e coube a mim desenvolver as funcionalidades da aplicação.

Foram elas:
* Calcular o número de itens únicos adicionados ao carrinho (Caso tenham 2 itens A e 3 itens B, exibir 2 itens em vez de 5 (soma de A+B);
* Exibir na tela inicial a lista de produtos a partir da API e formatar o preço para Real Brasileiro.
* Em cada item, o botão "Adicionar ao Carrinho" deve adicionar um ao carrinho, e ao lado mostrar quantos itens daquele produto estão adicionados. E ao adicionar, verificar se não excede a quantidade no estoque.
* Exibir na tela de carrinho todos os produtos que foram adicionados. Exibir os preços unitários e subtotal de cada item e formatados em Real Brasileiro. 
* Em cada produto no carrinho, deve ser possível atualizar a quantidade a ser comprada. Não podendo ser menor que 1 ou maior que o disponível no estoque. E também é possível remover um item.
* Ainda na tela de carrinho, é exibido o valor total, sendo esse, a soma do subtotal de todos os itens.
* Por fim, todas as alterações do carrinho deveriam ser salvas e recuperadas da memória do navegador para caso a página fosse atualizada. Isso evita a perda do carrinho.

Tomei a liberdade de adicionar dois pequenos Empty Pages, um para a tela inicial, caso não seja possível acessar a API, mostra um botão de atualizar página. O segundo é para quando o Carrinho estiver vazio. Além disso, utilizei o `react-toastify` para notificar que um produto foi retirado com sucesso do carrinho.


## Iniciando a aplicação:

Para iniciar, é necessário que os dois comandos abaixo executem paralelamente.

Com Yarn:

```
# Iniciar o servidor JSON
$ yarn server

# Iniciar aplicação
$ yarn start
```

Com NPM:

```
# Iniciar o servidor JSON
$ npm run server

# Iniciar aplicação
$ npm run start
```