enum Escolaridade{
	FUNDAMENTAL = "Fundamental",
	MEDIO = "Médio",
	SUPERIOR_INCOMPLETO = "Superior Incompleto",
	SUPERIOR_COMPLETO = "Superior Completo",
	TECNICO_INCOMPLETO = "Técnico Incompleto",
    TECNICO_COMPLETO = "Técnico Completo",
}
class Pessoa{
    private id:number;
    private cpf:string;
    private nome:string;
    private telefone:string;
    private escolaridade:Escolaridade;

    constructor(id:number, cpf:string, nome:string, telefone:string, escolaridade:Escolaridade){
        this.setId(id);
        this.setCpf(cpf);
        this.setNome(nome);
        this.setTelefone(telefone);
        this.setEscolaridade(escolaridade);
    }
    static createFromAnyObject(obj:any[]):Pessoa{
        return new Pessoa(
            obj["id"], 
            obj["CPF"], 
            obj["nome"], 
            obj["telefone"], 
            obj["escolaridade"]    
        );
    }
    getId():number{
        return this.id;
    }
    setId(id:number){
        this.id=id;
    }
    getCpf():string{
        return this.cpf;
    }
    getNome():string{
        return this.nome;
    }
    getTelefone():string{
        return this.telefone;
    }
    getEscolaridade():Escolaridade{
        return this.escolaridade;
    }
    setCpf(cpf:string):void{
        if(cpf.length==0){
            throw new Error("Informe o CPF");
        }else{
            if(cpf.match("[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}")){
                this.cpf=cpf;
            }else{
                throw new Error("CPF Inválido");
            }
        }
    }
    setNome(nome:string):void{
        console.log(nome.length);
        if(nome.length==0){
            throw new Error("Informe o nome");
        }else{
            this.nome=nome;
        }
    }
    setTelefone(telefone:string):void{
        if(telefone.length==0){
            throw new Error("Informe o Telefone");
        }else{
            if(telefone.match("\\([0-9]{2}\\)([0-9]{5}|[0-9]{4})-[0-9]{4}")){
                this.telefone=telefone;
            }else{
                throw new Error("Telefone Inválido")
            }
        }
    }
    setEscolaridade(escolaridade:Escolaridade):void{
        this.escolaridade=escolaridade;
    }
    toRaw():string{
        return "<tr><td>"+this.cpf+"</td><td>"+this.nome+"</td><td class=\"telcolumn\">"+this.telefone+"</td><td class=\"escolcolumn\">"+Escolaridade[this.escolaridade]+"</td><td><input type=\"radio\" name=\"selecao\" id=\"selecao\" class=\"selecao\" value=\""+this.id+"\"/></td></tr>"
    }
    toJson():string{
        return "{ \"CPF\" : \""+this.cpf+"\", \"nome\" : \""+this.nome+"\", \"telefone\" : \""+this.telefone+"\", \"escolaridade\" : \""+this.escolaridade+"\" }";
    }
    toJsonWithId():string{
        return "{ \"id\" : \""+this.id+"\", \"CPF\" : \""+this.cpf+"\", \"nome\" : \""+this.nome+"\", \"telefone\" : \""+this.telefone+"\", \"escolaridade\" : \""+this.escolaridade+"\" }";
    }
}
class PessoaJSONSerializable{
    CreateObjectFromJSON(data:object):Pessoa{
        return new Pessoa(
            data["id"],
            data["CPF"], 
            data["nome"], 
            data["telefone"], 
            data["escolaridade"]);
    }
    CreateArrayFromJSON(data:object[]):Pessoa[]{
        var i:number;
        var pessoas:Pessoa[] = new Array();

        for(i=0; i<data.length; i++){
            pessoas[i] =  this.CreateObjectFromJSON(data[i]);
        }

        return pessoas;
    }
}
