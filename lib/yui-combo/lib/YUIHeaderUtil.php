<?php
class YUIHeaderUtil {
	public function setAge($age = 0) {
		header("Age: $age");
	}

	public function setCacheControl($cacheControl = "max-age=315360000") {
		header("Cache-Control: $cacheControl");
	}

	public function setContentLength($bytes) {
		header("Content-Length: $bytes");
	}

	public static function setContentType($mimetype) {
		header("Content-Type: ".$mimetype);
	}

	public function setExpires() {
		header("Expires: " . @date("r", @mktime() + (60 * 60 * 24 * 365 * 10)));
	}

	public static function setForbidden() {
		header("HTTP/1.1 403 Forbidden");
	}

	public function setGzip() {
		header("Content-Encoding: gzip");
	}
}
?>