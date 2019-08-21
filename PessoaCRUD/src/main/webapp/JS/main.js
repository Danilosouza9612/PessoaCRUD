var container = "listContainer";
function voltar(){
    showContainer("listContainer");
    $("#addOrChangerForm").trigger("reset");
}
function showContainer(containerId){
    $("#"+containerId).show();
    $("#"+container).hide();
    container=containerId;
}
function showAlertContainer(msg, status){
    /** 1 - Sucesso
     * 2 - Erro **/
    var selectClass;
    if(status==1)
    { 
        selectClass="alert-success";
    }
    else{ 
        selectClass="alert-danger";
    }
    var content = "<div class=\"alert "+selectClass+" fade in\"><a href=\"#\" class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a><p>"+msg+"</p></div>";
    $("#errorContainer").html(content);
}

$(document).ready(function(){
        $("#listContainer").load("listar.html", function(){
            $("#addOrChangerContainer").load("adicionar.html", function(){
                $("#infoContainer").load("info.html", function(){
                    listar();
                    $("#botaoRemover").on("click", function(){
                        showRemoveAnswer(); 
                    })
                    $("#chgButton").on("click", function(){
                        showChangerContainer();
                    });
                    $("#addButton").on("click", function(){
                        showAddContainer();
                    });
                    $(".voltarBut").on("click", function(){
                        voltar();
                    });
                    $("#adicionarBut").on("click", function(){
                        addPessoa();
                    });
                    $("#alterarBut").on("click", function(){
                        changePessoa();
                    });
                    $("#infoButton").on("click", function(){
                        pessoaInfo();
                    });
                    $("body").on("change", "#selecao",  function(){
                        $(".btnaction").removeAttr("disabled");
                    });
                    $("#simbutt").on("click", function(){
                        remover();
                        hideRemoveAnswer();
                    });
                    $("#naobutt").on("click", function(){
                        hideRemoveAnswer();
                    });
                    $("#CPF").on("keyup", function(event){
                        mascara("###.###.###-##", this, event, false);
                    });
                    $("#telefone").on("keyup", function(event){
                        mascara("(##)#####-####", this, event, false);
                    });
                    $("#telefone").on("focusout", function(){
                        var valorTelefone = $("#telefone").val();
                        valorTelefone = valorTelefone
                            .replace("(", "")
                            .replace(")", "")
                            .replace("-", "");

                        if($("#telefone").val().length==13){
                            $("#telefone").val(valorTelefone);
                            mascara("(##)####-####", this, event, false);
                        }
                    });
                });
            });
        });
    });