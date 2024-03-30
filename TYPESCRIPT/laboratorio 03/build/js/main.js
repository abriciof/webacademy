"use strict";
class TV {
    constructor(modelo, resolucao, tamanhoPolegadas, fabricante, valor) {
        this.modelo = modelo;
        this.resolucao = resolucao;
        this.tamanhoPolegadas = tamanhoPolegadas;
        this.fabricante = fabricante;
        this.valor = valor;
    }
    descricao() {
        return `${this.fabricante} ${this.modelo} ${this.tamanhoPolegadas}" ${this.resolucao} - R$${this.valor}`;
    }
}
class Celular {
    constructor(modelo, memoria, fabricante, valor) {
        this.modelo = modelo;
        this.memoria = memoria;
        this.fabricante = fabricante;
        this.valor = valor;
    }
    descricao() {
        return `${this.fabricante} ${this.modelo} ${this.memoria} - R$${this.valor}`;
    }
}
class Bicicleta {
    constructor(modelo, tamanhoAro, fabricante, valor) {
        this.modelo = modelo;
        this.tamanhoAro = tamanhoAro;
        this.fabricante = fabricante;
        this.valor = valor;
    }
    descricao() {
        return `${this.fabricante} ${this.modelo} Aro ${this.tamanhoAro} - R$${this.valor}`;
    }
}
class Carrinho {
    constructor() {
        this.itens = [];
    }
    adicionar(item) {
        this.itens.push(item);
    }
    getItens() {
        return this.itens;
    }
    valorTotal() {
        return this.itens.reduce((total, item) => total + item.valor, 0);
    }
    descricaoItens() {
        return this.itens.map(item => item.descricao());
    }
}
const carrinho = new Carrinho();
const tv = new TV("X-Series", "4K", 55, "Sony", 5000);
const celular = new Celular("Galaxy S21", "128GB", "Samsung", 2800);
const bicicleta = new Bicicleta("Speedster", 29, "Scott", 1200);
carrinho.adicionar(tv);
carrinho.adicionar(celular);
carrinho.adicionar(bicicleta);
console.log("Itens no Carrinho:");
carrinho.getItens().forEach(item => console.log(item.descricao()));
console.log(`Valor Total: R$${carrinho.valorTotal()}`);
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
        const produtoSelect = document.getElementById('produto');
        const adicionarButton = document.querySelector('button');
        produtoSelect.addEventListener('change', atualizarCamposProduto);
        adicionarButton.addEventListener('click', adicionarProduto);
    });
}
function atualizarCamposProduto() {
    const produto = document.getElementById('produto').value;
    // Aqui você pode mostrar/ocultar campos específicos para cada tipo de produto
    // Por exemplo, esconder o campo de resolução se o produto selecionado não for uma TV
}
function adicionarProduto() {
    const produto = document.getElementById('produto').value;
    const modelo = document.getElementById('modelo').value;
    // Coletar outros valores dos campos...
    let novoProduto;
    switch (produto) {
        case 'tv':
            // Supondo que existam campos específicos para cada produto no seu HTML
            const resolucao = document.getElementById('resolucao').value;
            const tamanhoPolegadas = parseInt(document.getElementById('tamanhoPolegadas').value);
            // Coletar valor e fabricante...
            const fabricante = 'dad';
            const valor = 323;
            novoProduto = new TV(modelo, resolucao, tamanhoPolegadas, fabricante, valor);
            break;
        case 'celular':
            // Coletar memória, valor, fabricante...
            const memoria = "23gb";
            const fabricante2 = 'dad';
            const valor2 = 323;
            novoProduto = new Celular(modelo, memoria, fabricante2, valor2);
            break;
        case 'bicicleta':
            // Coletar tamanho do aro, valor, fabricante...
            const fabricante3 = 'dad';
            const valor3 = 323;
            novoProduto = new Bicicleta(modelo, 3, fabricante3, valor3);
            break;
    }
    if (novoProduto) {
        carrinho.adicionar(novoProduto);
        atualizarCarrinhoUI();
    }
}
function atualizarCarrinhoUI() {
    const itensCarrinhoEl = document.getElementById('itensCarrinho');
    const valorTotalEl = document.getElementById('valorTotal');
    // Limpa a lista de itens
    if (itensCarrinhoEl && valorTotalEl) {
        itensCarrinhoEl.innerHTML = '';
        // Adiciona cada item do carrinho na UI
        carrinho.getItens().forEach(produto => {
            const itemEl = document.createElement('div');
            itemEl.classList.add('item-carrinho');
            itemEl.textContent = produto.descricao();
            itensCarrinhoEl.appendChild(itemEl);
        });
        // Atualiza o valor total
        valorTotalEl.textContent = `R$${carrinho.valorTotal().toFixed(2)}`;
    }
}
