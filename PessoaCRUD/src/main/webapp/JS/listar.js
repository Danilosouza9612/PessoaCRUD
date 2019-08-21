function listarNaTabela(data){
    var serializable = new PessoaJSONSerializable();
    var pessoas = serializable.CreateArrayFromJSON(data);
    var i;

    $("#listContent").html("");

    for(i=0; i<pessoas.length; i++){
        $("#listContent").append(pessoas[i].toRaw());
    }
}
function listar(){
    $(".btnaction").attr("disabled", "disabled");
    $.ajax({
        method : "GET", 
        url : "api/pessoas/",
        success : function(data){
            listarNaTabela(data);
        },
        error: function(result){
            showAlertContainer("<b>"+result.status+":</b>Erro interno do servidor", 2);
        }
    });            
}
function remover(){
    var sel = $("#selecao:checked").val();
    $.ajax({
        method : "DELETE",
        url : "api/pessoas/"+sel,
        success : function(data){
            showAlertContainer(data, 1);
            listar();
        },
        error: function(result){
            showAlertContainer("<b>"+result.status+":</b>Erro interno do servidor", 2);
        }
    });
}
function showRemoveAnswer(){
    $("#removeAnswerBlockContainer").show();
    $("#removeAnswerContainer").show();
}
function hideRemoveAnswer(){
    $("#removeAnswerBlockContainer").hide();
    $("#removeAnswerContainer").hide();
}