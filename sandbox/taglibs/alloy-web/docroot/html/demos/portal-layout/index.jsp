<!DOCTYPE html>

<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<html>
<head>
	<script src="<%= PropsValues.ALLOY_BASE_PATH %>aui/aui.js" type="text/javascript"></script>

	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />

	<style type="text/css">
	#content-wrapper {
		width: 950px;
	}

	.column {
		background: lightyellow;
		padding: 10px;
		border: 1px solid;
	}

	.portlet {
		background: #EEEFB3;
		margin: 10px;
	}

	.aui-portal-layout-proxy {
		position: absolute;
		width: 100px;
		height: 20px;
		background: black;
		opacity: .7;
	    filter: alpha(opacity=70);
	}

	.portlet-list {
		border: 1px solid;
		left: 960px;
		position: absolute;
		top: 51px;
		width: 128px;
	}

	.portlet-list .portlet-item {
		background: lightblue;
		margin: 10px;
		padding: 5px;
		height: 30px;
		width: 100px;
	}

	.aui-portal-layout-drag-target-indicator  {
		margin: 2px 0;
	}
	</style>
</head>

<body>

<h1>Alloy - PortalLayout</h1>

<div id="content-wrapper">
	<table id="grid" class="grid">
		<tbody>
			<tr>
				<td valign="top" id="column-1" class="column">
					<div class="portlet">
						Portlet 1 1<br/>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</div>
					<div class="portlet">
						Portlet 1 2<br/>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</div>
					<div class="portlet">
						Portlet 1 3<br/>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</div>
				</td>
				<td valign="top" id="column-2" class="column">
					<div class="portlet">
						Portlet 2<br/>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</div>
				</td>
				<td valign="top" id="column-3" class="column">

				</td>
			</tr>
			<tr>
				<td valign="top" id="column-1-1" class="column">
					<div class="portlet">
						Portlet 3<br/>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</div>
				</td>
				<td valign="top" id="nested-column-2" class="column">
					<div class="portlet">
						Portlet 4 - Nested<br/>
						<table id="grid" class="grid">
							<tbody>
								<tr>
									<td valign="top" id="column-1" class="column">
										<div class="portlet">
											Nested Column 1
										</div>
									</td>
									<td valign="top" id="column-2" class="column">
										<div class="portlet">
											Nested Column 2
											<table id="grid" class="grid">
												<tbody>
													<tr>
														<td valign="top" id="column-1" class="column">
															<div class="portlet">
																Nested Column 1-1
															</div>
														</td>
														<td valign="top" id="column-2" class="column">
															<div class="portlet">
																Nested Column 2-2
															</div>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</td>
				<td valign="top" id="column-3-3" class="column">

				</td>
			</tr>
		</tbody>
	</table>
</div>

<div class="portlet-list">
	<div class="portlet-item">Portlet Item</div>
	<div class="portlet-item">Portlet Item</div>
	<div class="portlet-item">Portlet Item</div>
	<div class="portlet-item">Portlet Item</div>
	<div class="portlet-item">Portlet Item</div>
	<div class="portlet-item">Portlet Item</div>
	<div class="portlet-item">Portlet Item</div>
</div>

<div class="invalid">Invalid drop</div>

<alloy:portal-layout
	dragNodes=".portlet"
	dropNodes=".column"
	lazyStart="true"
	render="true"
/>

<script type="text/javascript">

AUI().ready('aui-portal-layout', function(A) {

	var DDM = A.DD.DDM;

	var PortletItem = function() {
		PortletItem.superclass.constructor.apply(this, arguments);
	};

	PortletItem.NAME = 'PortletItem';

	PortletItem.ATTRS = {
		dd: {
			value: {
				target: false
			}
		},

		lazyStart: {
			value: true
		},

		itemContainer: {
			value: A.one('.portlet-list')
		}
	};

	A.extend(PortletItem, A.PortalLayout, {
		_getAppendNode: function() {
			var instance = this;

			instance.appendNode = DDM.activeDrag.get('node').clone();

			return instance.appendNode;
		}
	});

	var portletList = new PortletItem({
		dragNodes: '.portlet-item'
	});

	portletList.on('drag:end', function(event) {
		var newPorlet = A.Node.create('<div class="portlet">New Portlet</div>');

		if (portletList.appendNode && portletList.appendNode.inDoc()) {
			portletList.appendNode.replace(
				newPorlet
			);
		}
	});

	// Extras

	A.all('.portlet').each(function(node, i) {
		node.prepend('<div>'+node.get('id')+'</div>')
	});

});

</script>

</body>
</html>