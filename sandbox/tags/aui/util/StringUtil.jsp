<%@ include file="StringPool.jsp" %>
<%!
/**
 * <a href="StringUtil.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 */
public static class StringUtil {
	 
	public static String decapitalize(String s) {
		if (s.length() == 0) return s;

		return s.substring(0, 1).toLowerCase() + s.substring(1);
	}

	public static String[] split(String s) {
		return split(s, StringPool.COMMA);
	}

	public static String[] split(String s, String delimiter) {
		String[] values = {};

		if (s != null) {
			values = s.split(delimiter);
		}

		for (int i = 0; i < values.length; i++) {
			String value = values[i];

			if (value != null) {
				values[i] = value.trim();		
			}
		}

		return values;
	}

}
%>