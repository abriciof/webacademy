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
    getNumAlunos() {
        return this.lista.length;
    }
    getMediaIdades() {
        let qtde = this.getNumAlunos();
        let soma = 0;
        this.getLista().forEach(aluno => {
            soma += aluno.getIdade();
        });
        return soma / qtde;
    }
    getMediaAlturas() {
        let qtde = this.getNumAlunos();
        let soma = 0;
        this.getLista().forEach(aluno => {
            soma += aluno.getAltura();
        });
        return soma / qtde;
    }
    getMediaPesos() {
        let qtde = this.getNumAlunos();
        let soma = 0;
        this.getLista().forEach(aluno => {
            soma += aluno.getPeso();
        });
        return soma / qtde;
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
                        <td> ${aluno.getAltura()} </td>
                        <td> ${aluno.getPeso()} </td>
                        <td>
                        <button onclick="botaoRemover(${aluno.getId()})"> Remover </button>
                        <button onclick="botaoEditar(${aluno.getId()})"> Editar </button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                }
            });
        }
        let estIdade = document.getElementById("estIdade");
        let estPeso = document.getElementById("estPeso");
        let estAltura = document.getElementById("estAltura");
        estIdade.value = turma.getMediaIdades().toFixed(2).toString();
        estPeso.value = turma.getMediaPesos().toFixed(2).toString();
        estAltura.value = turma.getMediaAlturas().toFixed(2).toString();
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
    if (aluno) {
        let nomeInput = document.getElementById("nome");
        let idadeInput = document.getElementById("idade");
        let alturaInput = document.getElementById("altura");
        let pesoInput = document.getElementById("peso");
        nomeInput.value = aluno.getNomeCompleto();
        idadeInput.value = aluno.getIdade().toString();
        alturaInput.value = aluno.getAltura().toString();
        pesoInput.value = aluno.getPeso().toString();
        const btnSalvar = document.getElementById("salvarEdicao");
        const btnCancelar = document.getElementById("cancelarEdicao");
        btnSalvar.disabled = false;
        btnCancelar.disabled = false;
        btnSalvar.onclick = function () { botaoSalvar(id); }; // Atualiza a função onclick do botão Salvar para passar o ID
    }
    const btnSalvar = document.getElementById("salvar");
    const btnSalvarEdicao = document.getElementById("salvarEdicao");
    const btnCancelar = document.getElementById("cancelarEdicao");
    btnSalvar.disabled = true;
    btnSalvarEdicao.disabled = false;
    btnCancelar.disabled = false;
}
function botaoRemover(id) {
    turma.removeAluno(id);
    turma.gerarTableHTML();
}
function botaoCancelar() {
    let nomeInput = document.getElementById("nome");
    let idadeInput = document.getElementById("idade");
    let alturaInput = document.getElementById("altura");
    let pesoInput = document.getElementById("peso");
    nomeInput.value = "";
    idadeInput.value = "0";
    alturaInput.value = "0.0";
    pesoInput.value = "0.0";
    const btnSalvar = document.getElementById("salvar");
    const btnSalvarEdicao = document.getElementById("salvarEdicao");
    const btnCancelar = document.getElementById("cancelarEdicao");
    btnSalvar.disabled = false;
    btnSalvarEdicao.disabled = true;
    btnCancelar.disabled = true;
}
function botaoSalvar(id) {
    let nomeInput = document.getElementById("nome");
    let idadeInput = document.getElementById("idade");
    let alturaInput = document.getElementById("altura");
    let pesoInput = document.getElementById("peso");
    const nome = nomeInput.value;
    const idade = parseInt(idadeInput.value);
    const altura = parseFloat(alturaInput.value);
    const peso = parseFloat(pesoInput.value);
    const aluno = turma.getAlunoById(id);
    if (aluno) {
        aluno.setNomeCompleto(nome);
        aluno.setIdade(idade);
        aluno.setAltura(altura);
        aluno.setPeso(peso);
        turma.gerarTableHTML();
    }
    botaoCancelar();
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
