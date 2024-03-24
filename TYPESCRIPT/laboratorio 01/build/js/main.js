"use strict";
class Tarefa {
    constructor(descricao, prioridade, dataCriacao, id) {
        this.descricao = descricao;
        this.prioridade = prioridade;
        this.dataCriacao = dataCriacao;
        this.id = id;
        this.setDescricao(descricao);
        this.setPrioridade(prioridade);
        if (dataCriacao) {
            this.setDataCriacao(dataCriacao);
        }
        if (id) {
            this.setId(id);
        }
        else {
            this.setId(++Tarefa.count);
        }
    }
    getId() {
        return this.id;
    }
    getDescricao() {
        return this.descricao;
    }
    getPrioridade() {
        return this.prioridade;
    }
    getDataCriacao() {
        return this.dataCriacao;
    }
    setId(novoId) {
        this.id = novoId;
    }
    setDescricao(novaDescricao) {
        this.descricao = novaDescricao;
    }
    setPrioridade(novaPrioridade) {
        this.prioridade = novaPrioridade;
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
    removeTarefa(id) {
        this.lista = this.lista.filter(tarefa => tarefa.getId() !== id);
    }
    getLista() {
        return this.lista;
    }
    gerarTableHTML() {
        let listaTarefas = this.getLista();
        if (typeof document !== 'undefined') {
            const tableBody = document.getElementById("conteudoTabela");
            if (tableBody) {
                tableBody.innerHTML = "";
            }
            listaTarefas.forEach(tarefa => {
                const row = document.createElement('tr');
                if (tarefa && tableBody) {
                    let dataAtual = tarefa.getDataCriacao();
                    let dataStr = "";
                    if (dataAtual) {
                        dataStr += dataAtual.toLocaleDateString();
                    }
                    row.innerHTML = `
                        <td> ${tarefa.getId()} </td>
                        <td> ${tarefa.getDescricao()} </td>
                        <td> ${tarefa.getPrioridade()} </td>
                        <td> ${dataStr}</td>
                        <td><button onclick="botaoRemover(${tarefa.getId()})"> Remover </button></td>
                    `;
                    tableBody.appendChild(row);
                }
            });
        }
    }
}
function botaoAdd() {
    const mensagemAlerta = "A descrição e a prioridade são parâmetros obrigatórios!";
    if (typeof document !== 'undefined') {
        let descricaoInput = document.getElementById("descricao");
        let prioridadeInput = document.getElementById("prioridade");
        let dataInput = document.getElementById("data");
        if (descricaoInput && prioridadeInput) {
            let descricao = descricaoInput.value;
            let prioridade = prioridadeInput.value;
            if (!descricao || !prioridade) {
                alert(mensagemAlerta);
            }
            else {
                let tarefa = new Tarefa(descricao, prioridade);
                if (dataInput) {
                    if (dataInput.value) {
                        let data = dataInput.value.split('-');
                        let ano = parseInt(data[0]);
                        let mes = parseInt(data[1]) - 1;
                        let dia = parseInt(data[2]);
                        const novaData = new Date(ano, mes, dia);
                        tarefa.setDataCriacao(novaData);
                    }
                }
                todoList.addTarefa(tarefa);
                todoList.gerarTableHTML();
            }
        }
        else {
            alert(mensagemAlerta);
        }
        descricaoInput.value = "";
        prioridadeInput.value = "";
        dataInput.value = "";
    }
}
function botaoRemover(id) {
    todoList.removeTarefa(id);
    todoList.gerarTableHTML();
}
// Tasks iniciais
const data1 = new Date(2024, 3 - 1, 23);
const task1 = new Tarefa("Atividade de TypeScript", "Prioridade Alta", data1);
const data2 = undefined;
const task2 = new Tarefa("Atividade de Express", "Prioridade Baixa", data2);
// Criando a lista de tarefas
const todoList = new TODO([]);
todoList.addTarefa(task1);
todoList.addTarefa(task2);
todoList.gerarTableHTML();
console.log(todoList.getLista());
