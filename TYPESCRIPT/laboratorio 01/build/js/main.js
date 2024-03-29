"use strict";
class Tarefa {
    constructor(titulo, prioridade, dataEntrega, descricao, dataCriacao, id) {
        this.titulo = titulo;
        this.prioridade = prioridade;
        this.dataEntrega = dataEntrega;
        this.descricao = descricao;
        this.dataCriacao = dataCriacao;
        this.id = id;
        this.setTitulo(titulo);
        this.setPrioridade(prioridade);
        this.setDataCriacao();
        if (dataEntrega) {
            this.setDataEntrega(dataEntrega);
        }
        if (descricao) {
            this.setDescricao(descricao);
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
    getTitulo() {
        return this.titulo;
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
    getDataEntrega() {
        return this.dataEntrega;
    }
    setId(novoId) {
        this.id = novoId;
    }
    setTitulo(novaTitulo) {
        this.titulo = novaTitulo;
    }
    setDescricao(novaDescricao) {
        this.descricao = novaDescricao;
    }
    setPrioridade(novaPrioridade) {
        this.prioridade = novaPrioridade;
    }
    setDataCriacao() {
        this.dataCriacao = new Date();
    }
    setDataEntrega(novaDataEntrega) {
        this.dataEntrega = novaDataEntrega;
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
    atualizarTarefa(id, novoTitulo, novaPrioridade, novaDescricao, novaDataEntrega) {
        const tarefa = this.lista.find(tarefa => tarefa.getId() === id);
        if (tarefa) {
            tarefa.setTitulo(novoTitulo);
            tarefa.setPrioridade(novaPrioridade);
            if (novaDescricao) {
                tarefa.setDescricao(novaDescricao);
            }
            if (novaDataEntrega) {
                tarefa.setDataEntrega(novaDataEntrega);
            }
            this.gerarTableHTML();
        }
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
                    let dataEntrega = tarefa.getDataEntrega();
                    let dataEntregaStr = "";
                    let dataCriacao = tarefa.getDataCriacao();
                    let dataCriacaoStr = "";
                    if (dataEntrega) {
                        dataEntregaStr += dataEntrega.toLocaleDateString();
                    }
                    if (dataCriacao) {
                        dataCriacaoStr += dataCriacao.toLocaleDateString();
                    }
                    let descricao = "";
                    if (tarefa.getDescricao()) {
                        descricao += tarefa.getDescricao();
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
function botaoAdd() {
    const mensagemAlerta = "O Título e a prioridade são parâmetros obrigatórios!";
    if (typeof document !== 'undefined') {
        let tituloInput = document.getElementById("titulo");
        let prioridadeInput = document.getElementById("prioridade");
        let descricaoInput = document.getElementById("descricao");
        let dataInput = document.getElementById("data");
        if (tituloInput && prioridadeInput) {
            let titulo = tituloInput.value;
            let prioridade = prioridadeInput.value;
            if (!titulo || !prioridade) {
                alert(mensagemAlerta);
            }
            else {
                let tarefa = new Tarefa(titulo, prioridade);
                if (dataInput) {
                    if (dataInput.value) {
                        let data = dataInput.value.split('-');
                        let ano = parseInt(data[0]);
                        let mes = parseInt(data[1]) - 1;
                        let dia = parseInt(data[2]);
                        const novaData = new Date(ano, mes, dia);
                        tarefa.setDataEntrega(novaData);
                    }
                }
                if (descricaoInput) {
                    if (descricaoInput.value) {
                        let descricao = descricaoInput.value;
                        tarefa.setDescricao(descricao);
                    }
                }
                todoList.addTarefa(tarefa);
                todoList.gerarTableHTML();
            }
        }
        else {
            alert(mensagemAlerta);
        }
        tituloInput.value = "";
        prioridadeInput.value = "";
        dataInput.value = "";
    }
}
function botaoRemover(id) {
    todoList.removeTarefa(id);
    todoList.gerarTableHTML();
}
function botaoEditar(id) {
    const tarefa = todoList.getLista().find(tarefa => tarefa.getId() === id);
    if (tarefa) {
        const tituloInput = document.getElementById("titulo");
        const prioridadeSelect = document.getElementById("prioridade");
        const descricaoInput = document.getElementById("descricao");
        const dataInput = document.getElementById("data");
        tituloInput.value = tarefa.getTitulo();
        prioridadeSelect.value = tarefa.getPrioridade();
        descricaoInput.value = tarefa.getDescricao() || '';
        let entrega = tarefa.getDataEntrega();
        if (entrega) {
            console.log(entrega.toISOString());
            let data = entrega.toISOString().substring(0, 10);
            console.log(data);
            dataInput.value = data;
        }
        const botaoAdd = document.querySelector(".addbtn");
        botaoAdd.innerText = 'Salvar Edição';
        botaoAdd.onclick = function () { botaoSalvarEdicao(id); };
    }
}
function botaoSalvarEdicao(id) {
    const tituloInput = document.getElementById("titulo");
    const prioridadeSelect = document.getElementById("prioridade");
    const descricaoInput = document.getElementById("descricao");
    const dataInput = document.getElementById("data");
    const novoTitulo = tituloInput.value;
    const novaPrioridade = prioridadeSelect.value;
    const novaDescricao = descricaoInput.value;
    const novaDataEntrega = dataInput.value ? new Date(dataInput.value) : undefined;
    todoList.atualizarTarefa(id, novoTitulo, novaPrioridade, novaDescricao, novaDataEntrega);
    const botaoAdicionar = document.querySelector(".addbtn");
    botaoAdicionar.innerText = 'Adicionar nova tarefa';
    botaoAdicionar.onclick = function () { botaoAdd(); };
    tituloInput.value = '';
    prioridadeSelect.value = 'Prioridade Baixa'; // Ou qualquer que seja seu valor padrão
    descricaoInput.value = '';
    dataInput.value = '';
}
function botaoSalvar(id) {
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
                btnSalvar.onclick = function () { botaoEditar(id); };
                // todoList.atualizarTarefa(id, novosValores); // Essa função precisa ser implementada
            }
        });
    }
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
