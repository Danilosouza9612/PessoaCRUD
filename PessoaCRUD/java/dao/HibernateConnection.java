package dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class HibernateConnection {
	private EntityManagerFactory factory;
	
	public HibernateConnection() {
		factory = Persistence.createEntityManagerFactory("PessoaPersistence");
	}
	public EntityManager getManager() {
		return factory.createEntityManager();
	}
}
