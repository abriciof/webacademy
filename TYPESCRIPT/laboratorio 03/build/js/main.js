"use strict";
// Produto TV
class TV {
    constructor(modelo, resolucao, tamanhoPolegadas, fabricante, valor) {
        this.modelo = modelo;
        this.resolucao = resolucao;
        this.tamanhoPolegadas = tamanhoPolegadas;
        this.fabricante = fabricante;
        this.valor = valor;
    }
    descricao() {
        return `${this.fabricante} ${this.modelo} ${this.tamanhoPolegadas}" ${this.resolucao} - R$ ${this.valor}`;
    }
}
// Produto Celular
class Celular {
    constructor(modelo, memoria, fabricante, valor) {
        this.modelo = modelo;
        this.memoria = memoria;
        this.fabricante = fabricante;
        this.valor = valor;
    }
    descricao() {
        return `${this.fabricante} ${this.modelo} ${this.memoria} - R$ ${this.valor}`;
    }
}
// Produto Bicicleta
class Bicicleta {
    constructor(modelo, tamanhoAro, fabricante, valor) {
        this.modelo = modelo;
        this.tamanhoAro = tamanhoAro;
        this.fabricante = fabricante;
        this.valor = valor;
    }
    descricao() {
        return `${this.fabricante} ${this.modelo} Aro ${this.tamanhoAro} - R$ ${this.valor}`;
    }
}
// Carrinho de Produtos
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
const tv = new TV("Televisão Digital", "4K", 55, "Sony", 5000);
const tv2 = new TV("Smart TV", "8K", 78, "Samsung", 8000);
const celular = new Celular("Galaxy S21", "128GB", "Samsung", 2800);
const bicicleta = new Bicicleta("Speedster", 29, "Scott", 1200);
carrinho.adicionar(tv);
carrinho.adicionar(tv2);
carrinho.adicionar(celular);
carrinho.adicionar(bicicleta);
console.log("Itens no Carrinho:");
carrinho.getItens().forEach(item => console.log(item.descricao()));
console.log(`Valor Total: R$ ${carrinho.valorTotal()}`);
function atualizarCamposProduto() {
    const select = document.getElementById('produtos');
    const bicicletaDiv = document.getElementById('bicicleta');
    const tvDiv = document.getElementById('tv');
    const celularDiv = document.getElementById('celular');
    if (select) {
        let valor = select.value;
        switch (valor) {
            case 'tv':
                if (tvDiv) {
                    tvDiv.style.display = 'block';
                }
                if (bicicletaDiv && celularDiv) {
                    bicicletaDiv.style.display = 'none';
                    celularDiv.style.display = 'none';
                }
                break;
            case 'celular':
                if (celularDiv) {
                    celularDiv.style.display = 'block';
                }
                if (tvDiv && bicicletaDiv) {
                    tvDiv.style.display = 'none';
                    bicicletaDiv.style.display = 'none';
                }
                break;
            case 'bicicleta':
                if (bicicletaDiv) {
                    bicicletaDiv.style.display = 'block';
                }
                if (tvDiv && celularDiv) {
                    tvDiv.style.display = 'none';
                    celularDiv.style.display = 'none';
                }
                break;
        }
    }
}
function botaoAdd(produto) {
    let novoProduto;
    switch (produto) {
        case 'tv':
            const modeloTv = document.getElementById('modeloTv').value;
            const resolucaoTv = document.getElementById('resolucaoTv').value;
            const polegadasTv = parseInt(document.getElementById('polegadasTv').value);
            const fabricanteTv = document.getElementById('fabricanteTv').value;
            const valorTv = parseInt(document.getElementById('valorTv').value);
            novoProduto = new TV(modeloTv, resolucaoTv, polegadasTv, fabricanteTv, valorTv);
            break;
        case 'celular':
            const modeloCelular = document.getElementById('modeloCelular').value;
            const memoriaCelular = document.getElementById('memoriaCelular').value;
            const fabricanteCelular = document.getElementById('fabricanteCelular').value;
            const valorCelular = parseInt(document.getElementById('valorCelular').value);
            novoProduto = new Celular(modeloCelular, memoriaCelular, fabricanteCelular, valorCelular);
            break;
        case 'bicicleta':
            const modeloBicicleta = document.getElementById('modeloBicicleta').value;
            const aroBicicleta = parseInt(document.getElementById('aroBicicleta').value);
            const fabricanteBicicleta = document.getElementById('fabricanteBicicleta').value;
            const valorBicicleta = parseInt(document.getElementById('valorBicicleta').value);
            novoProduto = new Bicicleta(modeloBicicleta, aroBicicleta, fabricanteBicicleta, valorBicicleta);
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
            const itemEl = document.createElement('li');
            itemEl.classList.add('item-carrinho');
            itemEl.textContent = produto.descricao();
            itensCarrinhoEl.appendChild(itemEl);
        });
        // Atualiza o valor total
        valorTotalEl.textContent = `Valor Total: R$ ${carrinho.valorTotal().toFixed(2)}`;
    }
}
function setup() {
    atualizarCamposProduto();
    const select = document.getElementById('produtos');
    select.addEventListener('change', () => {
        atualizarCamposProduto();
    });
    atualizarCarrinhoUI();
}
setup();
