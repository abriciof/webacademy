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
        return `${this.fabricante} ${this.modelo} ${this.tamanhoPolegadas}" ${this.resolucao} - R$ ${this.valor}`;
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
        return `${this.fabricante} ${this.modelo} ${this.memoria} - R$ ${this.valor}`;
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
        return `${this.fabricante} ${this.modelo} Aro ${this.tamanhoAro} - R$ ${this.valor}`;
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
    const select = (document.getElementById('produtos') as HTMLSelectElement);
    const bicicletaDiv = document.getElementById('bicicleta');
    const tvDiv = document.getElementById('tv');
    const celularDiv = document.getElementById('celular');
 
    if (select){
        let valor = select.value;
        switch(valor){
            case 'tv':
                if (tvDiv){
                    tvDiv.style.display = 'block'
                }

                if (bicicletaDiv && celularDiv){
                    bicicletaDiv.style.display = 'none';
                    celularDiv.style.display = 'none';
                }
                break;
            case 'celular':
                if (celularDiv){
                    celularDiv.style.display = 'block'
                }

                if (tvDiv && bicicletaDiv){
                    tvDiv.style.display = 'none';
                    bicicletaDiv.style.display = 'none';
                }
                break;
            case 'bicicleta':
                if (bicicletaDiv){
                    bicicletaDiv.style.display = 'block'
                }
                if (tvDiv && celularDiv){
                    tvDiv.style.display = 'none';
                    celularDiv.style.display = 'none';
                }
                break;
        }
    }
}

function botaoAdd(produto: string) {
   
    let novoProduto;
    switch (produto) {
        case 'tv':
            const modeloTv = (document.getElementById('modeloTv') as HTMLInputElement).value;
            const resolucaoTv = (document.getElementById('resolucaoTv') as HTMLInputElement).value;
            const polegadasTv = parseInt((document.getElementById('polegadasTv') as HTMLInputElement).value);
            const fabricanteTv = (document.getElementById('fabricanteTv') as HTMLInputElement).value;
            const valorTv = parseInt((document.getElementById('valorTv') as HTMLInputElement).value);
            novoProduto = new TV(modeloTv, resolucaoTv, polegadasTv, fabricanteTv, valorTv);
           
            break;
        case 'celular':
            const modeloCelular = (document.getElementById('modeloCelular') as HTMLInputElement).value;
            const memoriaCelular = (document.getElementById('memoriaCelular') as HTMLInputElement).value;
            const fabricanteCelular = (document.getElementById('fabricanteCelular') as HTMLInputElement).value;
            const valorCelular = parseInt((document.getElementById('valorCelular') as HTMLInputElement).value);
            novoProduto = new Celular(modeloCelular, memoriaCelular, fabricanteCelular, valorCelular);
           
            break;
        case 'bicicleta':
            const modeloBicicleta = (document.getElementById('modeloBicicleta') as HTMLInputElement).value;
            const aroBicicleta = parseInt((document.getElementById('aroBicicleta') as HTMLInputElement).value);
            const fabricanteBicicleta = (document.getElementById('fabricanteBicicleta') as HTMLInputElement).value;
            const valorBicicleta = parseInt((document.getElementById('valorBicicleta') as HTMLInputElement).value);
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
    if (itensCarrinhoEl && valorTotalEl){
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

function setup(){
    atualizarCamposProduto();
    const select = (document.getElementById('produtos') as HTMLSelectElement);
    select.addEventListener('change', () => {
        atualizarCamposProduto();
    });
    atualizarCarrinhoUI()
}

setup()

