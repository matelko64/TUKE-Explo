package com.tuke.explo.entity;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class StringArray2DConverter implements AttributeConverter<String[][], String> {

    @Override
    public String convertToDatabaseColumn(String[][] attribute) {
        if (attribute == null) {
            return null;
        }
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        for (int i = 0; i < attribute.length; i++) {
            sb.append("{");
            for (int j = 0; j < attribute[i].length; j++) {
                sb.append("\"").append(attribute[i][j].replace("\"", "\\\"")).append("\"");
                if (j < attribute[i].length - 1) {
                    sb.append(",");
                }
            }
            sb.append("}");
            if (i < attribute.length - 1) {
                sb.append(",");
            }
        }
        sb.append("}");
        return sb.toString();
    }

    @Override
    public String[][] convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.equals("{}")) {
            return new String[0][0];
        }
        // Remove outer braces
        String content = dbData.substring(1, dbData.length() - 1);
        if (content.isEmpty()) {
            return new String[0][0];
        }
        String[] rows = content.split("\\},\\{");
        String[][] result = new String[rows.length][];
        for (int i = 0; i < rows.length; i++) {
            String row = rows[i].replace("{", "").replace("}", "");
            if (row.isEmpty()) {
                result[i] = new String[0];
            } else {
                // Split by "," but handle quoted strings
                String[] elements = row.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
                result[i] = new String[elements.length];
                for (int j = 0; j < elements.length; j++) {
                    String elem = elements[j].trim();
                    if (elem.startsWith("\"") && elem.endsWith("\"")) {
                        elem = elem.substring(1, elem.length() - 1).replace("\\\"", "\"");
                    }
                    result[i][j] = elem;
                }
            }
        }
        return result;
    }
}