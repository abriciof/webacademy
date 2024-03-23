class Tarefa {
    static count: number = 0;
    public id: number;

    constructor(
        private descricao: string,
        private prioridade: string,
        private dataCriacao?: Date,
    ) {
        this.setDescricao(descricao);
        this.setPrioridade(prioridade);
        if (dataCriacao){
            this.setDataCriacao(dataCriacao);
        }
        this.id = ++Tarefa.count;
    }

    public getId(): number {
        return this.id;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public getPrioridade(): string {
        return this.prioridade;
    }

    public getDataCriacao(): Date | undefined {
        return this.dataCriacao;
    }

    public setDescricao(novaDescricao: string): void {
        this.descricao = novaDescricao;
    }

    public setPrioridade(novaPrioridade: string): void {
        this.prioridade = novaPrioridade;
    }

    public setDataCriacao(novaDataCriacao: Date): void {
        this.dataCriacao = novaDataCriacao;
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
                    let dataAtual : Date | undefined = tarefa.getDataCriacao();
                    let dataStr: string = "";
                    if (dataAtual){
                        dataStr += dataAtual.toLocaleDateString();
                    }
                    row.innerHTML = `
                        <td> ${tarefa.id} </td>
                        <td> ${tarefa.getDescricao()} </td>
                        <td> ${tarefa.getPrioridade()} </td>
                        <td> ${dataStr}</td>
                        <td><button onclick="botaoRemover(${tarefa.id})"> Remover </button></td>
                    `;
        
                    tableBody.appendChild(row);
                }
            });
        }
    }
}

function botaoAdd(): void {
    const mensagemAlerta = "A descrição e a prioridade são parâmetros obrigatórios!";
    if (typeof document !== 'undefined') {
        let descricaoInput : HTMLInputElement = document.getElementById("descricao") as HTMLInputElement;
        let prioridadeInput: HTMLInputElement = document.getElementById("prioridade") as HTMLInputElement;
        let dataInput: HTMLInputElement = document.getElementById("data") as HTMLInputElement;
        if (descricaoInput && prioridadeInput){
            let descricao = descricaoInput.value;
            let prioridade = prioridadeInput.value;
            
            if (!descricao || !prioridade) {
                alert(mensagemAlerta);
            }else{
                let tarefa = new Tarefa(descricao, prioridade);
                if (dataInput) {
                    if (dataInput.value){
                        let data = dataInput.value.split('-');
                        let ano: number = parseInt(data[0]);
                        let mes: number = parseInt(data[1]) - 1;
                        let dia: number = parseInt(data[2]);
                        const novaData: Date = new Date(ano,mes,dia);
                        tarefa.setDataCriacao(novaData);
                    }
                }
    
                todoList.addTarefa(tarefa);
                todoList.gerarTableHTML();
            }
        }else {
            alert(mensagemAlerta);
        }
        descricaoInput.value = "";
        prioridadeInput.value = "";
        dataInput.value = "";
    }
}


function botaoRemover(id: number){
    todoList.removeTarefa(id);
    todoList.gerarTableHTML();
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