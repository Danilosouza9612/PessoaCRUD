package models;

import javax.persistence.AttributeConverter;

public class EscolaridadeConverter implements AttributeConverter<Escolaridade, String> {

	@Override
	public String convertToDatabaseColumn(Escolaridade attribute) {
		// TODO Auto-generated method stub
		return attribute.toString();
	}

	@Override
	public Escolaridade convertToEntityAttribute(String dbData) {
		// TODO Auto-generated method stub
		return Enum.valueOf(Escolaridade.class, dbData);
	}


}
