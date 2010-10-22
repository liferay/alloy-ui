<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/xml" prefix="x" %>

<%@ taglib prefix="alloy" uri="http://alloy.liferay.com/tld/alloy" %>
<%@ taglib prefix="alloy-util" uri="http://alloy.liferay.com/tld/alloy_util" %>

<%
java.lang.Object boundingBox = (java.lang.Object)request.getAttribute(NAMESPACE.concat("boundingBox"));
java.lang.Object contentBox = (java.lang.Object)request.getAttribute(NAMESPACE.concat("contentBox"));
java.lang.Object srcNode = (java.lang.Object)request.getAttribute(NAMESPACE.concat("srcNode"));

boolean hasBoundingBox = GetterUtil.getBoolean(String.valueOf(boundingBox));
boolean hasContentBox = GetterUtil.getBoolean(String.valueOf(contentBox));
boolean hasSrcNode = GetterUtil.getBoolean(String.valueOf(srcNode));

boolean useJavaScript = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useJavaScript"), true);
boolean useMarkup = GetterUtil.getBoolean((Serializable)dynamicAttributes.get("useMarkup"), true);

String uniqueId = StringPool.BLANK;

if (useMarkup) {
	uniqueId = MarkupUtil.getUniqueId();

	String prefix = StringPool.POUND.concat(uniqueId);

	if (!hasBoundingBox) {
		boundingBox = prefix.concat("BoundingBox");

		_options.put("boundingBox", boundingBox);
	}

	if (!hasSrcNode && !hasContentBox) {
		srcNode = prefix.concat("SrcNode");

		_options.put("srcNode", srcNode);
	}

	if (!hasSrcNode && hasContentBox) {
		contentBox = prefix.concat("ContentBox");

		_options.put("contentBox", contentBox);
	}
}
%>