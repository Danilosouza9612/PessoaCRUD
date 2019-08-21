package dao;

import java.util.Iterator;

import models.Pessoa;

public interface PessoaDAO {
	public void inserir(Pessoa pessoa);
	public void alterar(Pessoa pessoa);
	public Pessoa selecionar(int id);
	public void remover(int id);
	public Iterator<Pessoa> listar();
	public boolean CPFJaExistente(String cpf);
}
