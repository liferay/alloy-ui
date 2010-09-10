<%@ include file="init.jsp" %>

<%
ScriptData scriptData = (ScriptData)request.getAttribute("alloy_util:script:script-data-inline");
%>

<c:if test="<%= scriptData != null %>">
	<script type="text/javascript">
		// <![CDATA[

			<%
			StringBundler rawSB = scriptData.getRawSB();

			rawSB.writeTo(out);

			StringBundler callbackSB = scriptData.getCallbackSB();
			%>

			<c:if test="<%= callbackSB.index() > 0 %>">

				<%
				Set<String> useSet = scriptData.getUseSet();

				StringBundler useSB = new StringBundler(useSet.size() * 4);

				for (String use : useSet) {
					useSB.append(StringPool.APOSTROPHE);
					useSB.append(use);
					useSB.append(StringPool.APOSTROPHE);
					useSB.append(StringPool.COMMA_AND_SPACE);
				}
				%>

				AUI().use(

					<%
					useSB.writeTo(out);
					%>

					function(A) {

						<%
						callbackSB.writeTo(out);
						%>

					}
				);
			</c:if>
		// ]]>
	</script>
</c:if>