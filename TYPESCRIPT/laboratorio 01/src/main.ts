class Tarefa {
    static count: number = 0;
    public id: number;

    constructor(
        private descricao: string,
        private status: boolean,
        private dataCriacao: Date,
    ) {
        this.setDescricao(descricao);
        this.setStatus(status);
        this.setDataCriacao(dataCriacao);
        this.id = ++Tarefa.count;
    }

    public getId(): number {
        return this.id;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public getStatus(): boolean {
        return this.status;
    }

    public getDataCriacao(): Date {
        return this.dataCriacao;
    }

    public setDescricao(novaDescricao: string): void {
        this.descricao = novaDescricao;
    }

    public setStatus(novoStatus: boolean): void {
        this.status = novoStatus;
    }

    public setDataCriacao(novaDataCriacao: Date): void {
        this.dataCriacao = novaDataCriacao;
    }
}


class TODO {
    constructor(
        private lista: Tarefa[]
    ){
        this.criaLista(lista);
    }

    public criaLista(novaLista: Tarefa[]){
        this.lista = novaLista;
    }

    public addTarefa(tarefa: Tarefa): void {
        this.lista.push(tarefa);
    }

    public renderLista(): [number, string, boolean, Date]{
        let tupla: [number, string, boolean, Date] = [this.lista[0].getId(), this.lista[0].getDescricao(), this.lista[0].getStatus(), this.lista[0].getDataCriacao()];
        for (var index = 1; index<this.lista.length; index++){
            tupla.push(this.lista[index].getId(), this.lista[index].getDescricao(), this.lista[index].getStatus(), this.lista[index].getDataCriacao());
        }
        return tupla
    }

}


const data1: Date = new Date(2024, 3 ,22);
const task1: Tarefa = new Tarefa("Arrumar quarto", false, data1);


const data2: Date = new Date(2024, 3 ,22);
const task2: Tarefa = new Tarefa("Arrumar sala", false, data2);
const data3: Date = new Date(2024, 3 ,22);
const task3: Tarefa = new Tarefa("Arrumar banheiro", false, data3);
const data4: Date = new Date(2024, 3 ,22);
const task4: Tarefa = new Tarefa("Arrumar cozinha", false, data4);

const todoList: TODO = new TODO([]);
todoList.addTarefa(task1);
todoList.addTarefa(task2);
todoList.addTarefa(task3);
todoList.addTarefa(task4);

console.log(todoList.renderLista());