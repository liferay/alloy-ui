<%@ include file="../init.tagf" %>

<%@ attribute name="name" required="true" type="java.lang.String" %>
<%@ attribute name="tagJspContext" required="true" type="javax.servlet.jsp.JspContext" %>

<%@ attribute name="inline" type="java.lang.Boolean" %>
<%@ attribute name="jsVar" type="java.lang.String" %>
<%@ attribute name="module" type="java.lang.String" %>
<%@ attribute name="options" type="java.util.HashMap" %>
<%@ attribute name="yuiVariable" type="java.lang.String" %>

<%
StringBuffer sb = new StringBuffer();

_buildHashString(sb, options);

jspContext.setAttribute("optionsString", sb.toString());
%>

<c:choose>
	<c:when test="${inline}">
		<script type="text/javascript">
			AUI().use('${module}', function(${yuiVariable}){
				var ${jsVar} = new ${yuiVariable}.${name}(${optionsString});
			});
		</script>
	</c:when>
	<c:otherwise>
		<alloy-util:cache modules="${module}">
			var ${jsVar} = new ${yuiVariable}.${name}(${optionsString});
		</alloy-util:cache>
	</c:otherwise>
</c:choose>

<%!
private void _buildHashString(StringBuffer sb, Map hashMap) {
	Set keys = hashMap.keySet();
	Iterator iterator = keys.iterator();

	sb.append(StringPool.OPEN_CURLY_BRACE);
	
	while (iterator.hasNext()) {
		String key = iterator.next().toString();
		Object value = hashMap.get(key);
		
		sb.append(key);
		sb.append(StringPool.COLON);
		
		if (value instanceof Map) {
			_buildHashString(sb, (Map)value);
		}
		else if (_isArray(value)) {
			_buildArrayString(sb, (Object[])value);			
		}
		else {
			sb.append(value.toString());
		}

		if (iterator.hasNext()) {
			sb.append(StringPool.COMMA);
		}
	}
	
	sb.append(StringPool.CLOSE_CURLY_BRACE);
}

private void _buildArrayString(StringBuffer sb, Object[] array) {
	sb.append(StringPool.OPEN_BRACKET);
	
	for (int i = 0; i < array.length; i++) {
		Object item = array[i];
		
		if (_isArray(item)) {
			_buildArrayString(sb, (Object[])item);
		} else {
			sb.append(StringPool.APOSTROPHE + item.toString() + 
				StringPool.APOSTROPHE);
		}

		if (i < array.length - 1) {
			sb.append(StringPool.COMMA);
		}
	}
	
	sb.append(StringPool.CLOSE_BRACKET);
}

private boolean _isArray(Object obj) {
	Class<?> type = obj.getClass();
	
	return type.isArray();
}
%>
