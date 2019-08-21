package controllers;

import java.util.Iterator;

import dao.PessoaDAO;
import dao.PessoaDAOFactory;
import models.Pessoa;

public class PessoaController {
	private PessoaDAO context;
	
	public PessoaController() {
		context = new PessoaDAOFactory().getInstance();
	}
	
	public void inserir(Pessoa pessoa) {
		this.context.inserir(pessoa);
	}
	public void alterar(Pessoa pessoa) {
		this.context.alterar(pessoa);
	}
	public void remover(int id) {
		this.context.remover(id);
	}
	public Pessoa selecionar(int id) {
		return this.context.selecionar(id);
	}
	public Iterator<Pessoa> listar(){
		return this.context.listar();
	}
	public boolean CPFJaExistente(String cpf) {
		return this.context.CPFJaExistente(cpf);
	}
}
