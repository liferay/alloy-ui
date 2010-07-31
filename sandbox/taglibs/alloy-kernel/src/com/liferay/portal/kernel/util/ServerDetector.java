/**
 * Copyright (c) 2000-2010 Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

package com.liferay.portal.kernel.util;

import com.liferay.portal.kernel.log.Log;
import com.liferay.portal.kernel.log.LogFactoryUtil;

/**
 * @author Brian Wing Shun Chan
 */
public class ServerDetector {

	public static final String GERONIMO_ID = "geronimo";

	public static final String GLASSFISH_ID = "glassfish";

	public static final String JBOSS_ID = "jboss";

	public static final String JETTY_ID = "jetty";

	public static final String JONAS_ID = "jonas";

	public static final String OC4J_ID = "oc4j";

	public static final String RESIN_ID = "resin";

	public static final String TOMCAT_ID = "tomcat";

	public static final String WEBLOGIC_ID = "weblogic";

	public static final String WEBSPHERE_ID = "websphere";

	public static String getServerId() {
		if (_serverId == null) {
			if (isGeronimo()) {
				_serverId = GERONIMO_ID;
			}
			else if (isGlassfish()) {
				_serverId = GLASSFISH_ID;
			}
			else if (isJBoss()) {
				_serverId = JBOSS_ID;
			}
			else if (isJOnAS()) {
				_serverId = JONAS_ID;
			}
			else if (isOC4J()) {
				_serverId = OC4J_ID;
			}
			else if (isResin()) {
				_serverId = RESIN_ID;
			}
			else if (isWebLogic()) {
				_serverId = WEBLOGIC_ID;
			}
			else if (isWebSphere()) {
				_serverId = WEBSPHERE_ID;
			}

			if (isJetty()) {
				if (_serverId == null) {
					_serverId = JETTY_ID;
				}
			}
			else if (isTomcat()) {
				if (_serverId == null) {
					_serverId = TOMCAT_ID;
				}
			}

			if (_log.isInfoEnabled()) {
				if (_serverId != null) {
					_log.info("Detected server " + _serverId);
				}
				else {
					_log.info("No server detected");
				}
			}

			if (_serverId == null) {
				throw new RuntimeException("Server is not supported");
			}
		}

		return _serverId;
	}

	public static boolean isGeronimo() {
		if (_geronimo == null) {
			_geronimo = _detect(
				"/org/apache/geronimo/system/main/Daemon.class");
		}

		return _geronimo.booleanValue();
	}

	public static boolean isGlassfish() {
		if (_glassfish == null) {
			String value = System.getProperty("com.sun.aas.instanceRoot");

			if (value != null) {
				_glassfish = Boolean.TRUE;
			}
			else {
				_glassfish = Boolean.FALSE;
			}
		}

		return _glassfish.booleanValue();
	}

	public static boolean isJBoss() {
		if (_jBoss == null) {
			_jBoss = _detect("/org/jboss/Main.class");
		}

		return _jBoss.booleanValue();
	}

	public static boolean isJetty() {
		if (_jetty == null) {
			_jetty = _detect("/org/mortbay/jetty/Server.class");
		}

		return _jetty.booleanValue();
	}

	public static boolean isJOnAS() {
		if (_jonas == null) {
			_jonas = _detect("/org/objectweb/jonas/server/Server.class");

			if (!_jonas && (System.getProperty("jonas.root") != null)) {
				_jonas = Boolean.TRUE;
			}
		}

		return _jonas.booleanValue();
	}

	public static boolean isOC4J() {
		if (_oc4j == null) {
			_oc4j = _detect("oracle.oc4j.util.ClassUtils");
		}

		return _oc4j.booleanValue();
	}

	public static boolean isResin() {
		if (_resin == null) {
			_resin = _detect("/com/caucho/server/resin/Resin.class");
		}

		return _resin.booleanValue();
	}

	public static boolean isSupportsComet() {
		return false;
	}

	public static boolean isTomcat() {
		if (_tomcat == null) {
			_tomcat = _detect("/org/apache/catalina/startup/Bootstrap.class");
		}

		if (_tomcat == null) {
			_tomcat = _detect("/org/apache/catalina/startup/Embedded.class");
		}

		return _tomcat.booleanValue();
	}

	public static boolean isWebLogic() {
		if (_webLogic == null) {
			_webLogic = _detect("/weblogic/Server.class");
		}

		return _webLogic.booleanValue();
	}

	public static boolean isWebSphere() {
		if (_webSphere == null) {
			_webSphere = _detect(
				"/com/ibm/websphere/product/VersionInfo.class");
		}

		return _webSphere.booleanValue();
	}

	private static Boolean _detect(String className) {
		try {
			ClassLoader.getSystemClassLoader().loadClass(className);

			return Boolean.TRUE;
		}
		catch (ClassNotFoundException cnfe) {
			Class<?> classObj = _instance.getClass();

			if (classObj.getResource(className) != null) {
				return Boolean.TRUE;
			}
			else {
				return Boolean.FALSE;
			}
		}
	}

	private ServerDetector() {
	}

	private static Log _log = LogFactoryUtil.getLog(ServerDetector.class);

	private static ServerDetector _instance = new ServerDetector();

	private static String _serverId;
	private static Boolean _geronimo;
	private static Boolean _glassfish;
	private static Boolean _jBoss;
	private static Boolean _jetty;
	private static Boolean _jonas;
	private static Boolean _oc4j;
	private static Boolean _resin;
	private static Boolean _tomcat;
	private static Boolean _webLogic;
	private static Boolean _webSphere;

}