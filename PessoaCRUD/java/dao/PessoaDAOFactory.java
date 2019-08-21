package dao;


public class PessoaDAOFactory {
	private enum FactoryOption{
		HIBERNATE, ARRAY
	}
	
	public PessoaDAO getInstance() {
		FactoryOption option = FactoryOption.HIBERNATE;
		
		switch(option) {
		case HIBERNATE:
			return new HibernatePessoaDAO();
		case ARRAY:
			throw new UnsupportedOperationException("Não suporta Array");
		}
		
		return null;
	}
}
