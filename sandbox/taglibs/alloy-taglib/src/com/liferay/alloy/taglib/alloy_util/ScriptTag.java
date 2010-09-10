package com.liferay.alloy.taglib.alloy_util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.jsp.JspException;

import com.liferay.alloy.taglib.alloy_util.base.BaseScriptTag;
import com.liferay.portal.kernel.servlet.taglib.aui.ScriptData;
import com.liferay.portal.kernel.util.GetterUtil;

/**
 * <a href="ScriptTag.java.html"><b><i>View Source</i></b></a>
 *
 * @author Eduardo Lundgren
 * @author Bruno Basto
 * @author Nathan Cavanaugh
 */
public class ScriptTag extends BaseScriptTag {

	public int doEndTag() throws JspException {
		HttpServletRequest request =
			(HttpServletRequest)pageContext.getRequest();

		String position = GetterUtil.getString(getPosition(), _POSITION_AUTO);

		boolean printBuffer = GetterUtil.getBoolean(getPrintBuffer());

		if (printBuffer) {
			position = _POSITION_INLINE;
		}

		try {
			if (position.equals(_POSITION_INLINE)) {
				ScriptData scriptData = null;

				if (printBuffer) {
					scriptData = (ScriptData)getNamespacedAttribute(
						request, "script-data");
				}

				_updateScriptData(request, scriptData, position);

				return super.doEndTag();
			}
			else {
				ScriptData scriptData = (ScriptData)getNamespacedAttribute(
					request, "script-data");

				_updateScriptData(request, scriptData, position);
			}

			return EVAL_PAGE;
		}
		catch (Exception e) {
			throw new JspException(e);
		}
		finally {
			if (position.equals(_POSITION_INLINE)) {
				if (printBuffer) {
					request.removeAttribute(
						_ATTRIBUTE_NAMESPACE.concat("script-data"));
				}

				request.removeAttribute(
					_ATTRIBUTE_NAMESPACE.concat("script-data-inline"));
			}
		}
	}

	private void _updateScriptData(
		HttpServletRequest request, ScriptData scriptData, String position) {

		if (scriptData == null) {
			scriptData = new ScriptData();
		}

		scriptData.append(getBodyContentString(), getUse());

		String key = "script-data-inline";

		if (!position.equals(_POSITION_INLINE)) {
			key = "script-data";
		}

		setNamespacedAttribute(request, key, scriptData);
	}

	private static final String _POSITION_AUTO = "auto";

	private static final String _POSITION_INLINE = "inline";

}