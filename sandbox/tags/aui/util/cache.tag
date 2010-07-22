<%@ include file="../init.tagf" %>

<%@ attribute name="modules" required="true" type="java.lang.String" %>

<jsp:doBody var="javascript"/>

<%
String javascript = (String)jspContext.getAttribute("javascript");
String modules = (String)jspContext.getAttribute("modules");

StringBuffer javascriptCache = (StringBuffer)request.getAttribute("javascriptCache");
Set<String> modulesCache = (LinkedHashSet<String>)request.getAttribute("modulesCache");

if (javascriptCache == null) {
	javascriptCache = new StringBuffer();
}

javascriptCache.append(javascript.trim());

if (modulesCache == null) {
	modulesCache = new LinkedHashSet<String>();
}

for (String module : modules.split(StringPool.COMMA)) {
	module = module.trim();
	
	if (!module.equals(StringPool.BLANK)) {
		modulesCache.add(module);
	}
}

request.setAttribute("javascriptCache", javascriptCache);
request.setAttribute("modulesCache", modulesCache);
%>