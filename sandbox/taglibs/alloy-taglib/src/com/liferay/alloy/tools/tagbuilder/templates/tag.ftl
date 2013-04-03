<#include "copyright.ftl">

package ${packagePath}.${component.getPackage()};

import ${packagePath}.${component.getPackage()}.base.Base${component.getClassName()};

/**
<#list component.getAuthors() as author>
 * @author ${author}
</#list>
 */
public class ${component.getClassName()} extends Base${component.getClassName()} {
}