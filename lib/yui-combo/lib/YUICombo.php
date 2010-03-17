<?php
define(DOT, ".");
define(EMPTY_STRING, "");

class YUICombo {
	function __construct($modules, $config) {
		$this->init($modules, $config);
	}

	function init($modules, $config) {
		$this->defaults = array(
			"cache" => true,
			"cacheCombo" => true,
			"gzip" => true
		);

		$this->mimetype = array(
			"js" => "text/javascript",
			"css" => "text/css"
		);

		$this->setModules($modules);
		$this->setConfig($config);
	}

	function fixPath($path) {
		$path = ereg_replace("[/\]+", "/", $path);
		return str_replace("_", ".", $path);
	}

	function getBasePath() {
		$config = $this->getConfig();
		$basePath = $config[basePath];

		return $basePath ? $basePath : COMBO_FILE_PATH;
	}

	function getContent($path) {
		return file_get_contents($path);
	}

	function getModule($index) {
		$modules = $this->getModules();

		return $modules[$index];
	}

	function getRequestId() {
		$config = $this->getConfig();
		$cache = $config["cache"];
		$cacheCombo = $config["cacheCombo"];
		$gzip = $config["gzip"];

		$filemtimes = EMPTY_STRING;
		$query = $_SERVER["QUERY_STRING"].("gzip=".$gzip);

		foreach($this->getModules() as $index => $module) {
			$path = $this->path($module);

			if ($path) {
				$filemtimes .= filemtime($path);
			}
		}

		return sha1($query.$filemtimes);
	}

	function isSecureRequest() {
		$hasPermission = true;

		// checking security, not allow access files outside the builder folder
		foreach($this->getModules() as $index => $module) {
			$path = $this->path($module);

			if (!YUIFileUtil::isSubDir($path, YUI_BUILD_PATH)) {
				$hasPermission = false;
			}
		}

		if (!$hasPermission) {
			YUIHeaderUtil::setForbidden();
		}

		return $hasPermission;
	}

	function fixImagePath($content, $dirname) {
		$pattern = "/(url[(][\"']?)(?!https?)([^)\"']+)([\"']?[)])/i";
		$replacement = "$1$dirname$2$3";

		return preg_replace($pattern, $replacement, $content);
	}

	function loadModules() {
		$config = $this->getConfig();
		$cache = $config["cache"];
		$cacheCombo = $config["cacheCombo"];
		$gzip = $config["gzip"];

		$this->REQUEST_CACHE_ID = $this->getRequestId();

		// base the mimetype of the request on the first module
		$firstModulePath = $this->path(
			$this->getModule(0)
		);

		if ($firstModulePath && $this->isSecureRequest()) {
			$content = EMPTY_STRING;

			// including the module content...
			if ($cacheCombo) {
				$cachedContent = YUIFileUtil::getCache(
					$this->REQUEST_CACHE_ID
				);
			}

			if ($cachedContent) {
				$content = $cachedContent;
			}
			else {
				// concatenate the files
				foreach($this->getModules() as $index => $module) {
					$path = $this->path($module);

					if (YUIFileUtil::getFileExtension($path) == 'css') {
						// fixing url() for CSS, concatenating DOT.DS (./) to all fixed url to force it to be relative
						// the fixImagePath() won't fix for http(s) urls
						$dirname = dirname( $this->fixPath(DOT . DS . $module) ) . DS;

						$content .= $this->fixImagePath(
							$this->getContent($path),
							$dirname
						);
					}
					else {
						// JavaScript...
						$content .= $this->getContent($path);
					}
				}

				if ($gzip) {
					// gzip the content before save the cache
					$content = gzencode($content, 9);
				}

				if ($cacheCombo) {
					YUIFileUtil::writeCache(
						$this->REQUEST_CACHE_ID,
						$content
					);
				}
			}

			$requestMimeType = $this->mimetype[
				YUIFileUtil::getFileExtension($firstModulePath)
			];

			if ($cache) {
				YUIHeaderUtil::setAge();
				YUIHeaderUtil::setExpires();
				YUIHeaderUtil::setCacheControl();
			}

			YUIHeaderUtil::setContentType($requestMimeType);

			if ($gzip) {
				YUIHeaderUtil::setGzip();
			}

			echo $content;
		}
	}

	function path($path) {
		$path = $this->getBasePath() . DS . $path;
		$path = $this->fixPath($path);
		$realpath = realpath($path);

		return (file_exists($realpath) && is_readable($realpath)) ? $realpath : false;
	}

	/*
	* Getters and Setters
	*/

	function getConfig() {
		return $this->config;
	}

	function setConfig($config) {
		$this->config = array_merge($this->defaults, $config);
	}

	function getModules() {
		return $this->modules;
	}

	function setModules($modules) {
		$newModules = array();

		foreach($modules as $module => $val) {
			$path = $this->path($module);

			if ($path) {
				$newModules[] = $module;
			}
		}

		$this->modules = $newModules;
	}
}
?>