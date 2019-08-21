package models;



import java.io.Serializable;
import java.text.ParseException;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.swing.text.MaskFormatter;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity(name = "PESSOA")
public class Pessoa implements Serializable{
	@Id
	@GeneratedValue
	private int id;
	@Column(nullable=false, length=14)
	private String CPF;
	@Column(nullable=false, length=45)
	private String nome;
	@Column(nullable=false, length=14)
	private String telefone;
	@Column(nullable=false, length=45)
	@Convert(converter = EscolaridadeConverter.class)
	private Escolaridade escolaridade;
	
	public Pessoa() {
		
	}
	
	@JsonCreator
	public Pessoa(
			@JsonProperty("CPF") String CPF, 
			@JsonProperty("nome") String nome, 
			@JsonProperty("telefone") String telefone,
			@JsonProperty("escolaridade") Escolaridade escolaridade
			) {
		this.setCPF(CPF);
		this.setNome(nome);
		this.setTelefone(telefone);
		this.setEscolaridade(escolaridade);
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id=id;
	}
	@JsonProperty("CPF")
	public String getCPF() {
		return CPF;
	}
	public void setCPF(String CPF) {
		if(CPF.matches("[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}")) {
			this.CPF = CPF;
		}else {
			throw new IllegalArgumentException("CPF Inválido");
		}
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		if(!nome.isEmpty()) {
			this.nome = nome;
		}else {
			throw new IllegalArgumentException("Informe o nome");
		}
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		if(telefone.matches("\\([0-9]{2}\\)([0-9]{5}|[0-9]{4})-[0-9]{4}")) {
			this.telefone=telefone;
		}else {
			throw new IllegalArgumentException("Telefone Inválido");
		}	
	}

	public Escolaridade getEscolaridade() {
		return escolaridade;
	}

	public void setEscolaridade(Escolaridade escolaridade) {
		this.escolaridade = escolaridade;
	}
	@Override
	public int hashCode() {
		return id/7;
	}
	public boolean equals(Object o) {
		Pessoa pessoa = (Pessoa)o;
		return this.id==pessoa.id;
	}
}
