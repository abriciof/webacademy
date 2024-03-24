"use strict";
class Aluno {
    constructor(nomeCompleto, idade, altura, peso, id) {
        this.nomeCompleto = nomeCompleto;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
        this.id = id;
        this.setNomeCompleto(nomeCompleto);
        this.setIdade(idade);
        this.setAltura(altura);
        this.setPeso(peso);
        if (id) {
            this.setId(id);
        }
        else {
            this.setId(++Aluno.count);
        }
    }
    getId() {
        return this.id;
    }
    getNomeCompleto() {
        return this.nomeCompleto;
    }
    getIdade() {
        return this.idade;
    }
    getAltura() {
        return this.altura;
    }
    getPeso() {
        return this.peso;
    }
    setId(novoId) {
        this.id = novoId;
    }
    setNomeCompleto(novoNome) {
        this.nomeCompleto = novoNome;
    }
    setIdade(novaIdade) {
        this.idade = novaIdade;
    }
    setAltura(novaAltura) {
        this.altura = novaAltura;
    }
    setPeso(novoPeso) {
        this.peso = novoPeso;
    }
}
Aluno.count = 0;
class Turma {
    constructor(lista) {
        this.lista = lista;
        this.criaLista(lista);
    }
    criaLista(novaLista) {
        this.lista = novaLista;
    }
    addAluno(aluno) {
        this.lista.push(aluno);
    }
    getAlunoById(id) {
        const filtro = this.lista.filter(aluno => aluno.getId() === id);
        return filtro[0];
    }
    getIdByAluno(nomeCompleto_x, idade_x, altura_x, peso_x) {
        const filtro = this.lista.filter(aluno => aluno.getNomeCompleto() === nomeCompleto_x &&
            aluno.getIdade() === idade_x &&
            aluno.getAltura() === altura_x &&
            aluno.getPeso() === peso_x);
        return filtro[0].getId();
    }
    removeAluno(id) {
        this.lista = this.lista.filter(aluno => aluno.getId() !== id);
    }
    getLista() {
        return this.lista;
    }
    gerarTableHTML() {
        let listaAlunos = this.getLista();
        if (typeof document !== 'undefined') {
            const tableBody = document.getElementById("conteudoTabela");
            if (tableBody) {
                tableBody.innerHTML = "";
            }
            listaAlunos.forEach(aluno => {
                const row = document.createElement('tr');
                if (aluno && tableBody) {
                    row.innerHTML = `
                        <td> ${aluno.getId()} </td>
                        <td> ${aluno.getNomeCompleto()} </td>
                        <td> ${aluno.getIdade()} </td>
                        <td> ${parseFloat(`${aluno.getAltura()}`)} </td>
                        <td> ${parseFloat(`${aluno.getPeso()}`)} </td>
                        <td>
                        <button onclick="botaoRemover(${aluno.getId()})"> Remover </button>
                        <button onclick="botaoEditar(${aluno.getId()})"> Editar </button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                }
            });
        }
    }
}
function botaoAdd() {
    const mensagemAlerta = "Preencha todos os parâmetros!";
    if (typeof document !== 'undefined') {
        let nomeInput = document.getElementById("nome");
        let idadeInput = document.getElementById("idade");
        let alturaInput = document.getElementById("altura");
        let pesoInput = document.getElementById("peso");
        if (nomeInput && idadeInput && alturaInput && pesoInput) {
            let nome = nomeInput.value;
            let idade = parseInt(idadeInput.value);
            let altura = parseFloat(alturaInput.value);
            let peso = parseFloat(pesoInput.value);
            if (!nome || !idade || !altura || !peso) {
                alert(mensagemAlerta);
            }
            else {
                let aluno = new Aluno(nome, idade, altura, peso);
                turma.addAluno(aluno);
                turma.gerarTableHTML();
            }
        }
        else {
            alert(mensagemAlerta);
        }
        nomeInput.value = "";
        idadeInput.value = "0";
        alturaInput.value = "0.0";
        pesoInput.value = "0.0";
    }
}
function botaoEditar(id) {
    const aluno = turma.getAlunoById(id);
    const mensagemAlerta = "Erro ao carregar o DOM!";
    if (typeof document !== 'undefined') {
        let nomeInput = document.getElementById("nome");
        let idadeInput = document.getElementById("idade");
        let alturaInput = document.getElementById("altura");
        let pesoInput = document.getElementById("peso");
        nomeInput.value = `${aluno.getNomeCompleto()}`;
        idadeInput.value = `${aluno.getIdade()}`;
        alturaInput.value = `${aluno.getAltura()}`;
        pesoInput.value = `${aluno.getPeso()}`;
        const btnAdd = document.getElementById("salvar");
        const btnSalvar = document.getElementById("salvarEdicao");
        const btnCancelar = document.getElementById("cancelarEdicao");
        btnAdd.disabled = true;
        btnSalvar.disabled = false;
        btnCancelar.disabled = false;
    }
    else {
        console.log(mensagemAlerta);
        alert(mensagemAlerta);
    }
}
function botaoRemover(id) {
    turma.removeAluno(id);
    turma.gerarTableHTML();
}
function botaoCancelar() {
    if (typeof document !== 'undefined') {
        let nomeInput = document.getElementById("nome");
        let idadeInput = document.getElementById("idade");
        let alturaInput = document.getElementById("altura");
        let pesoInput = document.getElementById("peso");
        nomeInput.value = "";
        idadeInput.value = "0";
        alturaInput.value = "0.0";
        pesoInput.value = "0.0";
        const btnAdd = document.getElementById("salvar");
        const btnSalvar = document.getElementById("salvarEdicao");
        const btnCancelar = document.getElementById("cancelarEdicao");
        btnAdd.disabled = false;
        btnSalvar.disabled = true;
        btnCancelar.disabled = true;
    }
}
function botaoSalvar() {
    const mensagemAlerta = "Preencha todos os parâmetros!";
    if (typeof document !== 'undefined') {
        let nomeInput = document.getElementById("nome");
        let idadeInput = document.getElementById("idade");
        let alturaInput = document.getElementById("altura");
        let pesoInput = document.getElementById("peso");
        if (nomeInput && idadeInput && alturaInput && pesoInput) {
            let nome = nomeInput.value;
            let idade = parseInt(idadeInput.value);
            let altura = parseFloat(alturaInput.value);
            let peso = parseFloat(pesoInput.value);
            if (!nome || !idade || !altura || !peso) {
                alert(mensagemAlerta);
            }
            else {
                let aluno = new Aluno(nome, idade, altura, peso);
                turma.addAluno(aluno);
                turma.gerarTableHTML();
            }
        }
        else {
            alert(mensagemAlerta);
        }
        nomeInput.value = "";
        idadeInput.value = "0";
        alturaInput.value = "0.0";
        pesoInput.value = "0.0";
        const btnAdd = document.getElementById("salvar");
        const btnSalvar = document.getElementById("salvarEdicao");
        const btnCancelar = document.getElementById("cancelarEdicao");
        btnAdd.disabled = false;
        btnSalvar.disabled = true;
        btnCancelar.disabled = true;
    }
}
// Alunos iniciais
const aluno1 = new Aluno("Maria da Silva", 11, 1.50, 35.2);
const aluno2 = new Aluno("João Marcos", 12, 1.53, 31.2);
const aluno3 = new Aluno("Ana Maria", 12, 1.43, 29.2);
// Criando a lista de tarefas
const turma = new Turma([]);
turma.addAluno(aluno1);
turma.addAluno(aluno2);
turma.addAluno(aluno3);
turma.gerarTableHTML();
console.log(turma.getAlunoById(1));
