var Escolaridade;
(function (Escolaridade) {
    Escolaridade["FUNDAMENTAL"] = "Fundamental";
    Escolaridade["MEDIO"] = "M\u00E9dio";
    Escolaridade["SUPERIOR_INCOMPLETO"] = "Superior Incompleto";
    Escolaridade["SUPERIOR_COMPLETO"] = "Superior Completo";
    Escolaridade["TECNICO_INCOMPLETO"] = "T\u00E9cnico Incompleto";
    Escolaridade["TECNICO_COMPLETO"] = "T\u00E9cnico Completo";
})(Escolaridade || (Escolaridade = {}));
var Pessoa = /** @class */ (function () {
    function Pessoa(id, cpf, nome, telefone, escolaridade) {
        this.setId(id);
        this.setCpf(cpf);
        this.setNome(nome);
        this.setTelefone(telefone);
        this.setEscolaridade(escolaridade);
    }
    Pessoa.createFromAnyObject = function (obj) {
        return new Pessoa(obj["id"], obj["CPF"], obj["nome"], obj["telefone"], obj["escolaridade"]);
    };
    Pessoa.prototype.getId = function () {
        return this.id;
    };
    Pessoa.prototype.setId = function (id) {
        this.id = id;
    };
    Pessoa.prototype.getCpf = function () {
        return this.cpf;
    };
    Pessoa.prototype.getNome = function () {
        return this.nome;
    };
    Pessoa.prototype.getTelefone = function () {
        return this.telefone;
    };
    Pessoa.prototype.getEscolaridade = function () {
        return this.escolaridade;
    };
    Pessoa.prototype.setCpf = function (cpf) {
        if (cpf.length == 0) {
            throw new Error("Informe o CPF");
        }
        else {
            if (cpf.match("[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}")) {
                this.cpf = cpf;
            }
            else {
                throw new Error("CPF Inválido");
            }
        }
    };
    Pessoa.prototype.setNome = function (nome) {
        console.log(nome.length);
        if (nome.length == 0) {
            throw new Error("Informe o nome");
        }
        else {
            this.nome = nome;
        }
    };
    Pessoa.prototype.setTelefone = function (telefone) {
        if (telefone.length == 0) {
            throw new Error("Informe o Telefone");
        }
        else {
            if (telefone.match("\\([0-9]{2}\\)([0-9]{5}|[0-9]{4})-[0-9]{4}")) {
                this.telefone = telefone;
            }
            else {
                throw new Error("Telefone Inválido");
            }
        }
    };
    Pessoa.prototype.setEscolaridade = function (escolaridade) {
        this.escolaridade = escolaridade;
    };
    Pessoa.prototype.toRaw = function () {
        return "<tr><td>" + this.cpf + "</td><td>" + this.nome + "</td><td class=\"telcolumn\">" + this.telefone + "</td><td class=\"escolcolumn\">" + Escolaridade[this.escolaridade] + "</td><td><input type=\"radio\" name=\"selecao\" id=\"selecao\" class=\"selecao\" value=\"" + this.id + "\"/></td></tr>";
    };
    Pessoa.prototype.toJson = function () {
        return "{ \"CPF\" : \"" + this.cpf + "\", \"nome\" : \"" + this.nome + "\", \"telefone\" : \"" + this.telefone + "\", \"escolaridade\" : \"" + this.escolaridade + "\" }";
    };
    Pessoa.prototype.toJsonWithId = function () {
        return "{ \"id\" : \"" + this.id + "\", \"CPF\" : \"" + this.cpf + "\", \"nome\" : \"" + this.nome + "\", \"telefone\" : \"" + this.telefone + "\", \"escolaridade\" : \"" + this.escolaridade + "\" }";
    };
    return Pessoa;
}());
var PessoaJSONSerializable = /** @class */ (function () {
    function PessoaJSONSerializable() {
    }
    PessoaJSONSerializable.prototype.CreateObjectFromJSON = function (data) {
        return new Pessoa(data["id"], data["CPF"], data["nome"], data["telefone"], data["escolaridade"]);
    };
    PessoaJSONSerializable.prototype.CreateArrayFromJSON = function (data) {
        var i;
        var pessoas = new Array();
        for (i = 0; i < data.length; i++) {
            pessoas[i] = this.CreateObjectFromJSON(data[i]);
        }
        return pessoas;
    };
    return PessoaJSONSerializable;
}());
