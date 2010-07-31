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

package com.liferay.portal.kernel.log;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * @author Brian Wing Shun Chan
 */
public class Jdk14LogImpl implements Log {

	public Jdk14LogImpl(Logger log) {
		_log = log;
	}

	public void debug(Object msg) {
		_log.log(Level.FINE, msg.toString());
	}

	public void debug(Throwable t) {
		_log.log(Level.FINE, t.getMessage(), t);
	}

	public void debug(Object msg, Throwable t) {
		_log.log(Level.FINE, msg.toString(), t);
	}

	public void error(Object msg) {
		_log.log(Level.SEVERE, msg.toString());
	}

	public void error(Throwable t) {
		_log.log(Level.SEVERE, t.getMessage(), t);
	}

	public void error(Object msg, Throwable t) {
		_log.log(Level.SEVERE, msg.toString(), t);
	}

	public void fatal(Object msg) {
		_log.log(Level.SEVERE, msg.toString());
	}

	public void fatal(Throwable t) {
		_log.log(Level.SEVERE, t.getMessage(), t);
	}

	public void fatal(Object msg, Throwable t) {
		_log.log(Level.SEVERE, msg.toString(), t);
	}

	public void info(Object msg) {
		_log.log(Level.INFO, msg.toString());
	}

	public void info(Throwable t) {
		_log.log(Level.INFO, t.getMessage(), t);
	}

	public void info(Object msg, Throwable t) {
		_log.log(Level.INFO, msg.toString(), t);
	}

	public boolean isDebugEnabled() {
		return _log.isLoggable(Level.FINE);
	}

	public boolean isErrorEnabled() {
		return _log.isLoggable(Level.SEVERE);
	}

	public boolean isFatalEnabled() {
		return _log.isLoggable(Level.SEVERE);
	}

	public boolean isInfoEnabled() {
		return _log.isLoggable(Level.INFO);
	}

	public boolean isTraceEnabled() {
		return _log.isLoggable(Level.FINEST);
	}

	public boolean isWarnEnabled() {
		return _log.isLoggable(Level.WARNING);
	}

	public void trace(Object msg) {
		_log.log(Level.FINEST, msg.toString());
	}

	public void trace(Throwable t) {
		_log.log(Level.FINEST, t.getMessage(), t);
	}

	public void trace(Object msg, Throwable t) {
		_log.log(Level.FINEST, msg.toString(), t);
	}

	public void warn(Object msg) {
		_log.log(Level.WARNING, msg.toString());
	}

	public void warn(Throwable t) {
		_log.log(Level.WARNING, t.getMessage(), t);
	}

	public void warn(Object msg, Throwable t) {
		_log.log(Level.WARNING, msg.toString(), t);
	}

	private Logger _log;

}