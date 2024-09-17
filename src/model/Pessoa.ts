import { DatabaseModel } from "./DatabaseModel";

// Recupera o pool de conexões do banco de dados
const database = new DatabaseModel().pool;

export class Pessoa {

    private idPessoa: number = 0;
    private nome: string;
    private sobrenome: string;
    private cpf: string;
    private email: string;
    private cidade: string;
    private pais: string;

    constructor(_nome: string,
                _sobrenome: string,
                _cpf: string,
                _email: string,
                _cidade: string,
                _pais: string) 
    {
        this.nome = _nome;
        this.sobrenome = _sobrenome;
        this.cpf = _cpf;
        this.email = _email;
        this.cidade = _cidade;
        this.pais = _pais;
    }

    // idPessoa
    public getIdPessoa(): number {
        return this.idPessoa;
    }

    public setIdPessoa(idPessoa: number): void {
        this.idPessoa = idPessoa;
    }

    // nome
    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    // sobrenome
    public getSobrenome(): string {
        return this.sobrenome;
    }

    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    // cpf
    public getCpf(): string {
        return this.cpf;
    }

    public setCpf(cpf: string): void {
        this.cpf = cpf;
    }

    // email
    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    // cidade
    public getCidade(): string {
        return this.cidade;
    }

    public setCidade(cidade: string): void {
        this.cidade = cidade;
    }

    // pais
    public getPais(): string {
        return this.pais;
    }

    public setPais(pais: string): void {
        this.pais = pais;
    }

    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - READ - Update - Delete
    static async listarPessoas(): Promise<Array<Pessoa> | null> {
        // Criando lista vazia para armazenar as pessoas
        let listaDePessoas: Array<Pessoa> = [];

        try {
            // Query para consulta no banco de dados
            const querySelectPessoa = `SELECT * FROM pessoa;`;

            // executa a query no banco de dados
            const respostaBD = await database.query(querySelectPessoa);

            // percorre cada resultado retornado pelo banco de dados
            // pessoa é o apelido que demos para cada linha retornada do banco de dados
            respostaBD.rows.forEach((pessoa) => {
                // criando objeto pessoa
                let novaPessoa = new Pessoa(
                    pessoa.nome,
                    pessoa.sobrenome,
                    pessoa.cpf,
                    pessoa.email,
                    pessoa.cidade,
                    pessoa.pais
                );
                // adicionando o ID ao objeto
                novaPessoa.setIdPessoa(pessoa.id);

                // adicionando a pessoa na lista
                listaDePessoas.push(novaPessoa);
            });

            // retornado a lista de pessoas para quem chamou a função
            return listaDePessoas;
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }
}