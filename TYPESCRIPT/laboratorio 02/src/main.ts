class Aluno {
    static count: number = 0;

    constructor(
        private nomeCompleto: string,
        private idade: number,
        private altura: number,
        private peso: number,
        private id?: number,
    ){
        this.setNomeCompleto(nomeCompleto);
        this.setIdade(idade);
        this.setAltura(altura);
        this.setPeso(peso);
        if (id){
            this.setId(id);
        }else{
            this.setId(++Aluno.count);
        }
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getNomeCompleto(): string {
        return this.nomeCompleto;
    }

    public getIdade(): number {
        return this.idade;
    }

    public getAltura(): number {
        return this.altura;
    }

    public getPeso(): number {
        return this.peso;
    }

    public setId(novoId: number){
        this.id = novoId;
    }
    
    public setNomeCompleto(novoNome: string): void {
        this.nomeCompleto = novoNome;
    }

    public setIdade(novaIdade: number): void {
        this.idade = novaIdade;
    }

    public setAltura(novaAltura: number): void {
        this.altura = novaAltura;
    }

    public setPeso(novoPeso: number): void {
        this.peso = novoPeso;
    }
}

class Turma {
    constructor(private lista: Aluno[]){
        this.criaLista(lista);
    }

    public getNumAlunos(): number {
        return this.lista.length;
    }

    public getMediaIdades(): number{
        let qtde = this.getNumAlunos();
        let soma = 0;
        this.getLista().forEach(aluno => {
            soma += aluno.getIdade();
        });
        return soma/qtde;
    }

    public getMediaAlturas(): number{
        let qtde = this.getNumAlunos();
        let soma = 0;
        this.getLista().forEach(aluno => {
            soma += aluno.getAltura();
        });
        return soma/qtde;

    }

    public getMediaPesos(): number{
        let qtde = this.getNumAlunos();
        let soma = 0;
        this.getLista().forEach(aluno => {
            soma += aluno.getPeso();
        });
        return soma/qtde;
    }

    public criaLista(novaLista: Aluno[]){
        this.lista = novaLista;
    }

    public addAluno(aluno: Aluno): void {
        this.lista.push(aluno);
    }

    public getAlunoById(id: number): Aluno {
        const filtro: Aluno[] = this.lista.filter(aluno => aluno.getId() === id); 
        return filtro[0];
    }

    public getIdByAluno(
        nomeCompleto_x: string, 
        idade_x: number, 
        altura_x: number, 
        peso_x: number): number | undefined {

        const filtro: Aluno[] = this.lista.filter(
            aluno => 
                aluno.getNomeCompleto() === nomeCompleto_x &&
                aluno.getIdade() === idade_x &&
                aluno.getAltura() === altura_x &&
                aluno.getPeso() === peso_x
        ); 

        return filtro[0].getId();
    }

    public removeAluno(id: number): void {
        this.lista = this.lista.filter(aluno => aluno.getId() !== id);
    }

    public getLista(): Aluno[] {
        return this.lista
    }

    public gerarTableHTML(): void{
        let listaAlunos: Aluno[] = this.getLista();
        if (typeof document !== 'undefined') {
            const tableBody: HTMLElement = document.getElementById("conteudoTabela") as HTMLElement;
            
            if (tableBody){
                tableBody.innerHTML = "";
            }

            listaAlunos.forEach(aluno => {
                const row: HTMLElement = document.createElement('tr');
                if (aluno && tableBody){
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
        let estIdade : HTMLInputElement = document.getElementById("estIdade") as HTMLInputElement;
        let estPeso: HTMLInputElement = document.getElementById("estPeso") as HTMLInputElement;
        let estAltura: HTMLInputElement = document.getElementById("estAltura") as HTMLInputElement;

        estIdade.value = turma.getMediaIdades().toFixed(2).toString();
        estPeso.value = turma.getMediaPesos().toFixed(2).toString();
        estAltura.value = turma.getMediaAlturas().toFixed(2).toString();
    }
}

function botaoAdd(): void {
    const mensagemAlerta = "Preencha todos os parâmetros!";
    if (typeof document !== 'undefined') {
        let nomeInput : HTMLInputElement = document.getElementById("nome") as HTMLInputElement;
        let idadeInput: HTMLInputElement = document.getElementById("idade") as HTMLInputElement;
        let alturaInput: HTMLInputElement = document.getElementById("altura") as HTMLInputElement;
        let pesoInput: HTMLInputElement = document.getElementById("peso") as HTMLInputElement;

        if (nomeInput && idadeInput && alturaInput && pesoInput){
            let nome: string = nomeInput.value;
            let idade: number = parseInt(idadeInput.value);
            let altura: number = parseFloat(alturaInput.value);
            let peso: number = parseFloat(pesoInput.value);
            
            if (!nome || !idade || !altura || !peso) {
                alert(mensagemAlerta);
            }else{
                let aluno: Aluno = new Aluno(nome, idade, altura, peso);
                turma.addAluno(aluno);
                turma.gerarTableHTML();
            }
        }else {
            alert(mensagemAlerta);
        }

        nomeInput.value = "";
        idadeInput.value = "0";
        alturaInput.value = "0.0";
        pesoInput.value = "0.0";

    }
}

function botaoEditar(id: number): void {
    const aluno: Aluno = turma.getAlunoById(id);
    if (aluno) {
        let nomeInput: HTMLInputElement = document.getElementById("nome") as HTMLInputElement;
        let idadeInput: HTMLInputElement = document.getElementById("idade") as HTMLInputElement;
        let alturaInput: HTMLInputElement = document.getElementById("altura") as HTMLInputElement;
        let pesoInput: HTMLInputElement = document.getElementById("peso") as HTMLInputElement;

        nomeInput.value = aluno.getNomeCompleto();
        idadeInput.value = aluno.getIdade().toString();
        alturaInput.value = aluno.getAltura().toString();
        pesoInput.value = aluno.getPeso().toString();

        const btnSalvar: HTMLButtonElement = document.getElementById("salvarEdicao") as HTMLButtonElement;
        const btnCancelar: HTMLButtonElement = document.getElementById("cancelarEdicao") as HTMLButtonElement;
        btnSalvar.disabled = false;
        btnCancelar.disabled = false;

        btnSalvar.onclick = function() { botaoSalvar(id); }; 
    }

    const btnSalvar: HTMLButtonElement = document.getElementById("salvar") as HTMLButtonElement;
    const btnSalvarEdicao: HTMLButtonElement = document.getElementById("salvarEdicao") as HTMLButtonElement;
    const btnCancelar: HTMLButtonElement = document.getElementById("cancelarEdicao") as HTMLButtonElement;

    btnSalvar.disabled = true;
    btnSalvarEdicao.disabled = false;
    btnCancelar.disabled = false;
}


function botaoRemover(id: number): void {
    turma.removeAluno(id);
    turma.gerarTableHTML();
}

function botaoCancelar(): void {
    let nomeInput: HTMLInputElement = document.getElementById("nome") as HTMLInputElement;
    let idadeInput: HTMLInputElement = document.getElementById("idade") as HTMLInputElement;
    let alturaInput: HTMLInputElement = document.getElementById("altura") as HTMLInputElement;
    let pesoInput: HTMLInputElement = document.getElementById("peso") as HTMLInputElement;

    nomeInput.value = "";
    idadeInput.value = "0";
    alturaInput.value = "0.0";
    pesoInput.value = "0.0";

    const btnSalvar: HTMLButtonElement = document.getElementById("salvar") as HTMLButtonElement;
    const btnSalvarEdicao: HTMLButtonElement = document.getElementById("salvarEdicao") as HTMLButtonElement;
    const btnCancelar: HTMLButtonElement = document.getElementById("cancelarEdicao") as HTMLButtonElement;

    btnSalvar.disabled = false;
    btnSalvarEdicao.disabled = true;
    btnCancelar.disabled = true;
}


function botaoSalvar(id: number): void {
    let nomeInput: HTMLInputElement = document.getElementById("nome") as HTMLInputElement;
    let idadeInput: HTMLInputElement = document.getElementById("idade") as HTMLInputElement;
    let alturaInput: HTMLInputElement = document.getElementById("altura") as HTMLInputElement;
    let pesoInput: HTMLInputElement = document.getElementById("peso") as HTMLInputElement;

    const nome = nomeInput.value;
    const idade = parseInt(idadeInput.value);
    const altura = parseFloat(alturaInput.value);
    const peso = parseFloat(pesoInput.value);

    const aluno: Aluno = turma.getAlunoById(id);
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
const aluno1: Aluno = new Aluno("Maria da Silva", 11, 1.50, 35.2);
const aluno2: Aluno = new Aluno("João Marcos", 12, 1.53, 31.2);
const aluno3: Aluno = new Aluno("Ana Maria", 12, 1.43, 29.2);

// Criando a lista de tarefas
const turma: Turma = new Turma([]);
turma.addAluno(aluno1);
turma.addAluno(aluno2);
turma.addAluno(aluno3);

turma.gerarTableHTML();
console.log(turma.getAlunoById(1));