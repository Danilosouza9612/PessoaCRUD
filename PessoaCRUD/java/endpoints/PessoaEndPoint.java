package endpoints;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import controllers.PessoaController;
import models.Pessoa;

@Path("/pessoas")
public class PessoaEndPoint {
	private PessoaController pessoas;
	
	public PessoaEndPoint() {
		this.pessoas = new PessoaController();
	}
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public String inserir(String pessoa) throws JsonMappingException, JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		Pessoa pessoaObj = mapper.readValue(pessoa, Pessoa.class);
		pessoas.inserir(pessoaObj);
		return "Inserido com Sucesso";
	}
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{id}")
	public String selecionar(@PathParam("id") int id) throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(pessoas.selecionar(id));
	}
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String listar() throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(pessoas.listar());
	}
	@PUT
	@Consumes(MediaType.APPLICATION_JSON)
	public String alterar(String pessoa) throws JsonMappingException, JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		Pessoa pessoaObj = mapper.readValue(pessoa, Pessoa.class);
		pessoas.alterar(pessoaObj);
		return "Alterado com sucesso";
	}
	@DELETE
	@Path("/{id}")
	public String remover(@PathParam("id") int id) {
		pessoas.remover(id);
		return "Removido com sucesso";
	}
	@GET
	@Path("/verificarcpf/{cpf}")
	@Produces(MediaType.APPLICATION_JSON)
	public String CPFJaExistente(@PathParam("cpf") String cpf) throws JsonProcessingException {
		return "{ "
				+ "\"result\" : "+pessoas.CPFJaExistente(cpf)+
				" }";
	}
}
