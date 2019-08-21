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