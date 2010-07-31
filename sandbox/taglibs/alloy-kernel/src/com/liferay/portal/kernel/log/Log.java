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

/**
 * @author Brian Wing Shun Chan
 */
public interface Log {

	public void debug(Object msg);

	public void debug(Throwable t);

	public void debug(Object msg, Throwable t);

	public void error(Object msg);

	public void error(Throwable t);

	public void error(Object msg, Throwable t);

	public void fatal(Object msg);

	public void fatal(Throwable t);

	public void fatal(Object msg, Throwable t);

	public void info(Object msg);

	public void info(Throwable t);

	public void info(Object msg, Throwable t);

	public boolean isDebugEnabled();

	public boolean isErrorEnabled();

	public boolean isFatalEnabled();

	public boolean isInfoEnabled();

	public boolean isTraceEnabled();

	public boolean isWarnEnabled();

	public void trace(Object msg);

	public void trace(Throwable t);

	public void trace(Object msg, Throwable t);

	public void warn(Object msg);

	public void warn(Throwable t);

	public void warn(Object msg, Throwable t);

}