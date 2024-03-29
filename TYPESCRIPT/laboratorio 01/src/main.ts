class Tarefa {
    static count: number = 0;

    constructor(
        private titulo: string,
        private prioridade: string,
        private dataEntrega?: Date,
        private descricao?: string,
        private dataCriacao?: Date,
        private id?: number
    ) {
        this.setTitulo(titulo);
        this.setPrioridade(prioridade);
        this.setDataCriacao();
        if (dataEntrega){
            this.setDataEntrega(dataEntrega);
        }
        if (descricao){
            this.setDescricao(descricao);
        }

        if (id){
            this.setId(id);
        }else{
            this.setId(++Tarefa.count);
        }
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getTitulo(): string {
        return this.titulo;
    }

    public getDescricao(): string | undefined {
        return this.descricao;
    }

    public getPrioridade(): string {
        return this.prioridade;
    }

    public getDataCriacao(): Date | undefined{
        return this.dataCriacao;
    }

    public getDataEntrega(): Date | undefined {
        return this.dataEntrega;
    }

    public setId(novoId: number): void {
        this.id = novoId;
    }

    public setTitulo(novaTitulo: string): void {
        this.titulo = novaTitulo;
    }

    public setDescricao(novaDescricao: string): void {
        this.descricao = novaDescricao;
    }

    public setPrioridade(novaPrioridade: string): void {
        this.prioridade = novaPrioridade;
    }

    public setDataCriacao(): void {
        this.dataCriacao = new Date();
    }

    public setDataEntrega(novaDataEntrega: Date): void {
        this.dataEntrega = novaDataEntrega;
    }


}
class TODO {
    constructor(private lista: Tarefa[]){
        this.criaLista(lista);
    }

    public criaLista(novaLista: Tarefa[]){
        this.lista = novaLista;
    }

    public addTarefa(tarefa: Tarefa): void {
        this.lista.push(tarefa);
    }

    public removeTarefa(id: number): void {
        this.lista = this.lista.filter(tarefa => tarefa.getId() !== id);
    }

    public atualizarTarefa(id: number, novoTitulo: string, novaPrioridade: string, novaDescricao?: string, novaDataEntrega?: Date): void {
        const tarefa = this.lista.find(tarefa => tarefa.getId() === id);
        if (tarefa) {
            tarefa.setTitulo(novoTitulo);
            tarefa.setPrioridade(novaPrioridade);
            if (novaDescricao){
                tarefa.setDescricao(novaDescricao);
            }
            if (novaDataEntrega){
                tarefa.setDataEntrega(novaDataEntrega);
            }
            this.gerarTableHTML();
        }
    }

    public getLista(): Tarefa[] {
        return this.lista
    }

    public gerarTableHTML(): void{
        let listaTarefas = this.getLista();
        if (typeof document !== 'undefined') {
            const tableBody: HTMLElement = document.getElementById("conteudoTabela") as HTMLElement;
            
            if (tableBody){
                tableBody.innerHTML = "";
            }

            listaTarefas.forEach(tarefa => {
                const row = document.createElement('tr');
                if (tarefa && tableBody){
                    let dataEntrega : Date | undefined = tarefa.getDataEntrega();
                    let dataEntregaStr: string = "";
                    let dataCriacao: Date | undefined = tarefa.getDataCriacao();
                    let dataCriacaoStr: string = "";
                    if (dataEntrega){
                        dataEntregaStr += dataEntrega.toLocaleDateString();
                    }
                    if (dataCriacao){
                        dataCriacaoStr += dataCriacao.toLocaleDateString();
                    }

                    let descricao: string = "";
                    if (tarefa.getDescricao()){
                        descricao += tarefa.getDescricao()
                    }
                    row.innerHTML = `
                        <td> ${tarefa.getId()} </td>
                        <td> ${tarefa.getTitulo()} </td>
                        <td> ${dataCriacaoStr}</td>
                        <td> ${tarefa.getPrioridade()} </td>
                        <td> ${descricao} </td>
                        <td> ${dataEntregaStr}</td>
                        <td>
                        <button onclick="botaoRemover(${tarefa.getId()})"> Remover </button>
                        <button onclick="botaoEditar(${tarefa.getId()})"> Editar </button>
                        </td>
                    `;
        
                    tableBody.appendChild(row);
                }
            });
        }
    }
}

function botaoAdd(): void{
    const mensagemAlerta = "O Título e a prioridade são parâmetros obrigatórios!";
    if (typeof document !== 'undefined') {
        let tituloInput : HTMLInputElement = document.getElementById("titulo") as HTMLInputElement;
        let prioridadeInput: HTMLInputElement = document.getElementById("prioridade") as HTMLInputElement;
        let descricaoInput: HTMLInputElement = document.getElementById("descricao") as HTMLInputElement;
        let dataInput: HTMLInputElement = document.getElementById("data") as HTMLInputElement;
        if (tituloInput && prioridadeInput){
            let titulo = tituloInput.value;
            let prioridade = prioridadeInput.value;
            
            if (!titulo || !prioridade) {
                alert(mensagemAlerta);
            }else{
                let tarefa = new Tarefa(titulo, prioridade);
                if (dataInput) {
                    if (dataInput.value){
                        let data = dataInput.value.split('-');
                        let ano: number = parseInt(data[0]);
                        let mes: number = parseInt(data[1]) - 1;
                        let dia: number = parseInt(data[2]);
                        const novaData: Date = new Date(ano,mes,dia);
                        tarefa.setDataEntrega(novaData);
                    }
                }
                if (descricaoInput) {
                    if (descricaoInput.value){
                        let descricao: string = descricaoInput.value;
                        tarefa.setDescricao(descricao);
                    }
                }
    
                todoList.addTarefa(tarefa);
                todoList.gerarTableHTML();
            }
        }else {
            alert(mensagemAlerta);
        }
        tituloInput.value = "";
        prioridadeInput.value = "";
        dataInput.value = "";
    }
}

function botaoRemover(id: number){
    todoList.removeTarefa(id);
    todoList.gerarTableHTML();
}

function botaoEditar(id: number) {
    const tarefa = todoList.getLista().find(tarefa => tarefa.getId() === id);
    if (tarefa) {
        const tituloInput: HTMLInputElement = document.getElementById("titulo") as HTMLInputElement;
        const prioridadeSelect: HTMLSelectElement = document.getElementById("prioridade") as HTMLSelectElement;
        const descricaoInput: HTMLInputElement = document.getElementById("descricao") as HTMLInputElement;
        const dataInput: HTMLInputElement = document.getElementById("data") as HTMLInputElement;

        tituloInput.value = tarefa.getTitulo();
        prioridadeSelect.value = tarefa.getPrioridade();
        descricaoInput.value = tarefa.getDescricao() || '';
        let entrega = tarefa.getDataEntrega();
        if (entrega){
            // console.log(entrega.toISOString())
            let data = entrega.toISOString().substring(0,10);
            console.log(data)
            dataInput.value = data;
        }

        const botaoAdd: HTMLButtonElement = document.querySelector(".addbtn") as HTMLButtonElement;
        botaoAdd.innerText = 'Salvar Edição';
        botaoAdd.onclick = function() { botaoSalvarEdicao(id); };
    }
}


function botaoSalvarEdicao(id: number) {
    const tituloInput: HTMLInputElement = document.getElementById("titulo") as HTMLInputElement;
    const prioridadeSelect: HTMLSelectElement = document.getElementById("prioridade") as HTMLSelectElement;
    const descricaoInput: HTMLInputElement = document.getElementById("descricao") as HTMLInputElement;
    const dataInput: HTMLInputElement = document.getElementById("data") as HTMLInputElement;

    const novoTitulo = tituloInput.value;
    const novaPrioridade = prioridadeSelect.value;
    const novaDescricao = descricaoInput.value;
    const novaDataEntrega = dataInput.value ? new Date(dataInput.value) : undefined;

    todoList.atualizarTarefa(id, novoTitulo, novaPrioridade, novaDescricao, novaDataEntrega);

    const botaoAdicionar: HTMLButtonElement = document.querySelector(".addbtn") as HTMLButtonElement;
    botaoAdicionar.innerText = 'Adicionar nova tarefa';
    botaoAdicionar.onclick = function() { botaoAdd(); };

    tituloInput.value = '';
    prioridadeSelect.value = 'Prioridade Baixa'; // Ou qualquer que seja seu valor padrão
    descricaoInput.value = '';
    dataInput.value = '';
}


function botaoSalvar(id: number) {
    const tabela = document.getElementById('conteudoTabela');
    if (tabela) {
        const linhas = tabela.getElementsByTagName('tr');
        Array.from(linhas).forEach((linha) => {
            if (linha.cells[0].innerText == id.toString()) {
                for (let i = 1; i < linha.cells.length - 1; i++) {
                    const input = linha.cells[i].getElementsByTagName('input')[0];
                    const novoValor = input.value;
                    linha.cells[i].innerText = novoValor;   
                }

                const btnSalvar = linha.cells[linha.cells.length - 1].getElementsByTagName('button')[1];
                btnSalvar.innerText = 'Editar';
                btnSalvar.onclick = function() { botaoEditar(id); };

                // todoList.atualizarTarefa(id, novosValores); // Essa função precisa ser implementada
            }
        });
    }
}


// Tasks iniciais
const data1: Date = new Date(2024, 3-1 ,23);
const task1: Tarefa = new Tarefa("Atividade de TypeScript", "Prioridade Alta", data1);

const data2 = undefined;
const task2: Tarefa = new Tarefa("Atividade de Express", "Prioridade Baixa", data2);

// Criando a lista de tarefas
const todoList: TODO = new TODO([]);
todoList.addTarefa(task1);
todoList.addTarefa(task2);

todoList.gerarTableHTML();
console.log(todoList.getLista());