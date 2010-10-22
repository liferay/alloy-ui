<%
if (useMarkup) {
	String prefix = StringPool.POUND.concat(uniqueId);

	_options.put("counter", prefix.concat("Counter"));
	_options.put("input", prefix.concat("Input"));
}
%>