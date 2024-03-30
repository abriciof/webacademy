// Interface de Produto
interface Produto {
    modelo: string;
    fabricante: string;
    valor: number;
    descricao(): string;
}

// Produto TV
class TV implements Produto {
    constructor(
        public modelo: string,
        public resolucao: string,
        public tamanhoPolegadas: number,
        public fabricante: string,
        public valor: number
    ) {}

    descricao(): string {
        return `${this.fabricante} ${this.modelo} ${this.tamanhoPolegadas}" ${this.resolucao} - R$${this.valor}`;
    }
}

// Produto Celular
class Celular implements Produto {
    constructor(
        public modelo: string,
        public memoria: string,
        public fabricante: string,
        public valor: number
    ) {}

    descricao(): string {
        return `${this.fabricante} ${this.modelo} ${this.memoria} - R$${this.valor}`;
    }
}

// Produto Bicicleta
class Bicicleta implements Produto {
    constructor(
        public modelo: string,
        public tamanhoAro: number,
        public fabricante: string,
        public valor: number
    ) {}

    descricao(): string {
        return `${this.fabricante} ${this.modelo} Aro ${this.tamanhoAro} - R$${this.valor}`;
    }
}

// Carrinho de Produtos
class Carrinho <T extends Produto> {
    private itens: T[] = [];

    adicionar(item: T): void {
        this.itens.push(item);
    }

    getItens(): T[] {
        return this.itens;
    }

    valorTotal(): number {
        return this.itens.reduce((total, item) => total + item.valor, 0);
    }

    descricaoItens(): string[] {
        return this.itens.map(item => item.descricao());
    }
}


const carrinho = new Carrinho<Produto>();

const tv = new TV("X-Series", "4K", 55, "Sony", 5000);
const tv2 = new TV("Smart TV", "8K", 78, "Samsung", 8000);
const celular = new Celular("Galaxy S21", "128GB", "Samsung", 2800);
const bicicleta = new Bicicleta("Speedster", 29, "Scott", 1200);

carrinho.adicionar(tv);
carrinho.adicionar(tv2);
carrinho.adicionar(celular);
carrinho.adicionar(bicicleta);

console.log("Itens no Carrinho:");
carrinho.getItens().forEach(item => console.log(item.descricao()));

console.log(`Valor Total: R$${carrinho.valorTotal()}`);

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
        const produtoSelect = document.getElementById('produto') as HTMLSelectElement;
        const adicionarButton = document.querySelector('button') as HTMLButtonElement;

        produtoSelect.addEventListener('change', atualizarCamposProduto);
        adicionarButton.addEventListener('click', adicionarProduto);
    });
}

function atualizarCamposProduto() {
    const produto = (document.getElementById('produto') as HTMLSelectElement).value;
    // Aqui você pode mostrar/ocultar campos específicos para cada tipo de produto
    // Por exemplo, esconder o campo de resolução se o produto selecionado não for uma TV
}

function adicionarProduto() {
    const produto = (document.getElementById('produto') as HTMLSelectElement).value;
    const modelo = (document.getElementById('modelo') as HTMLInputElement).value;
    // Coletar outros valores dos campos...

    let novoProduto;

    switch (produto) {
        case 'tv':
            // Supondo que existam campos específicos para cada produto no seu HTML
            const resolucao = (document.getElementById('resolucao') as HTMLInputElement).value;
            const tamanhoPolegadas = parseInt((document.getElementById('tamanhoPolegadas') as HTMLInputElement).value);
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
    if (itensCarrinhoEl && valorTotalEl){
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
