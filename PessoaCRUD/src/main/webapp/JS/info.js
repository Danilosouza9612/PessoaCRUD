function pessoaInfo(){
    var sel = $("#selecao:checked").val();
    $.ajax({
        method: "GET",
        url: "api/pessoas/"+sel,
        success: function(data){
            $("#cpfInfo").text(data["CPF"]);
            $("#nomeInfo").text(data["nome"]);
            $("#telefoneInfo").text(data["telefone"]);
            $("#escolaridadeInfo").text(Escolaridade[data["escolaridade"]]);
            showContainer("infoContainer");
        },
        error : function(result){
            showAlertContainer("<b>"+result.status+":</b>Erro interno do servidor", 2);
        }
    });
}