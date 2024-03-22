"use strict";
class Tarefa {
    constructor(descricao, status, dataCriacao) {
        this.descricao = descricao;
        this.status = status;
        this.dataCriacao = dataCriacao;
        this.setDescricao(descricao);
        this.setStatus(status);
        this.setDataCriacao(dataCriacao);
        this.id = ++Tarefa.count;
    }
    getId() {
        return this.id;
    }
    getDescricao() {
        return this.descricao;
    }
    getStatus() {
        return this.status;
    }
    getDataCriacao() {
        return this.dataCriacao;
    }
    setDescricao(novaDescricao) {
        this.descricao = novaDescricao;
    }
    setStatus(novoStatus) {
        this.status = novoStatus;
    }
    setDataCriacao(novaDataCriacao) {
        this.dataCriacao = novaDataCriacao;
    }
}
Tarefa.count = 0;
class TODO {
    constructor(lista) {
        this.lista = lista;
        this.criaLista(lista);
    }
    criaLista(novaLista) {
        this.lista = novaLista;
    }
    addTarefa(tarefa) {
        this.lista.push(tarefa);
    }
    renderLista() {
        let tupla = [this.lista[0].getId(), this.lista[0].getDescricao(), this.lista[0].getStatus(), this.lista[0].getDataCriacao()];
        for (var index = 1; index < this.lista.length; index++) {
            tupla.push(this.lista[index].getId(), this.lista[index].getDescricao(), this.lista[index].getStatus(), this.lista[index].getDataCriacao());
        }
        return tupla;
    }
}
const data1 = new Date(2024, 3, 22);
const task1 = new Tarefa("Arrumar quarto", false, data1);
const data2 = new Date(2024, 3, 22);
const task2 = new Tarefa("Arrumar sala", false, data2);
const data3 = new Date(2024, 3, 22);
const task3 = new Tarefa("Arrumar banheiro", false, data3);
const data4 = new Date(2024, 3, 22);
const task4 = new Tarefa("Arrumar cozinha", false, data4);
const todoList = new TODO([]);
todoList.addTarefa(task1);
todoList.addTarefa(task2);
todoList.addTarefa(task3);
todoList.addTarefa(task4);
console.log(todoList.renderLista());
