var statusReturn;
function showAddContainer(){
    $("#addOrChangerContainer .containerCabecalho h2").text("Adicionar Pessoa");
    $("#addOrChangerContainer .containerCabecalho #adicionarBut").show();
    $("#addOrChangerContainer .containerCabecalho #alterarBut").hide();
    showContainer("addOrChangerContainer");
}
function addPessoa(){
    try{
            var pessoa = Pessoa.createFromAnyObject(generateFormObject());

            $.ajax({
                method : "POST",
                url : "api/pessoas/",
                contentType: "application/json",
                data : pessoa.toJson(),
                success : function(data){
                    showAlertContainer(data, 1);
                    listar();
                    voltar();
                },
                error : function(result){
                    showAlertContainer("<b>"+result.status+":</b>Erro interno do servidor", 2);
                }
            })
        }catch(e){
            showAlertContainer(e, 2);
        }
}
function verificarCPFExistente(cpf){
    $.ajax({
        method : "GET",
        url : "api/pessoas/verificarcpf/"+cpf,
        contentType : 'application/json',
        success : function(data){
            window.alert("Teste");
            if(data.result){
                showAlertContainer("Já existe um cadastro com este CPF",2);
                statusReturn = false;
            }

            statusReturn = true;
        },
        error : function(result){
             showAlertContainer("<b>"+result.status+":</b>Erro interno do servidor", 2);

             statusReturn = false;
        }
    })
}
function generateFormObject(){
    var formArray = $("#addOrChangerForm").serializeArray();
    var i;
    var formObject = {};
    var pessoa;
        
    for(i=0; i<formArray.length; i++){
        formObject[formArray[i].name]=formArray[i].value;    
    }

    return formObject;
}
function changePessoa(){
    try{
            var pessoa = Pessoa.createFromAnyObject(generateFormObject());
            $.ajax({
                method : "PUT",
                url : "api/pessoas/",
                contentType: "application/json",
                data : pessoa.toJsonWithId(),
                success : function(data){
                    showAlertContainer(data, 1);
                    listar();
                    voltar();
                },
                error : function(result){
                    showAlertContainer("<b>"+result.status+":</b>Erro interno do servidor", 2);
                }
            })
        }catch(e){
            showAlertContainer(e, 2);
        }
}
function showChangerContainer(){
    var sel = $("#selecao:checked").val();
    
    $.ajax({
        method: "GET",
        url : "api/pessoas/"+sel,
        success: function(data){
            $("#addOrChangerForm").dejsonify(JSON.stringify(data));
            
            $("#addOrChangerContainer .containerCabecalho h2").text("Alterar Pessoa");
            $("#addOrChangerContainer .containerCabecalho #alterarBut").show();
            $("#addOrChangerContainer .containerCabecalho #adicionarBut").hide();
            showContainer("addOrChangerContainer");
        },
        error : function(result){
            showAlertContainer("<b>"+result.status+":</b>Erro interno do servidor", 2);

        }
    });
}