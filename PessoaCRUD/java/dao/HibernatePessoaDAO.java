package dao;

import java.util.Iterator;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

import models.Pessoa;

public class HibernatePessoaDAO implements PessoaDAO {
	private HibernateConnection context;
	
	HibernatePessoaDAO() {
		context = new HibernateConnection();
	}
	
	@Override
	public void inserir(Pessoa pessoa) {
		EntityManager manager = context.getManager();
		manager.getTransaction().begin();
		manager.persist(pessoa);
		manager.getTransaction().commit();
		manager.close();
	}

	@Override
	public void alterar(Pessoa pessoa) {
		EntityManager manager = context.getManager();
		manager.getTransaction().begin();
		manager.merge(pessoa);
		manager.getTransaction().commit();
		manager.close();
	}

	@Override
	public Pessoa selecionar(int id) {
		EntityManager manager = context.getManager();
		Pessoa result = manager.find(Pessoa.class, id);
		manager.close();
		return result;
	}

	@Override
	public void remover(int id) {
		EntityManager manager = context.getManager();
		Pessoa result = manager.find(Pessoa.class, id);
		System.out.println(result.getCPF());
		manager.getTransaction().begin();
		manager.remove(result);
		manager.getTransaction().commit();
		manager.close();
	}

	@Override
	public Iterator<Pessoa> listar() {
		String hql = "from PESSOA";
		EntityManager manager = context.getManager();
		Iterator<Pessoa> list = manager
									.createQuery(hql)
									.getResultList()
									.iterator();
		manager.close();
		return list;
	}
	@Override
	public boolean CPFJaExistente(String cpf) {
		try {
			cpfJaExistente(cpf);
			return false;
		}catch(IllegalArgumentException e) {
			return true;
		}
	}
	public void cpfJaExistente(String cpf) {
		String hql = "from PESSOA p where p.CPF = :CPF";
		EntityManager manager = context.getManager();
		try {
			Pessoa resultado = (Pessoa) manager
										.createQuery(hql)
										.setParameter("CPF", cpf)
										.getSingleResult();
			throw new IllegalArgumentException("Já existe um cadastro com esse CPF");
		}catch(NoResultException e) {
			return;
		}
	}
}
