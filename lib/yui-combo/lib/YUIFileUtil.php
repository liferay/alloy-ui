<?php
class YUIFileUtil {
	public static function getFileExtension($filename) {
		eregi("\.([^.]+)*$", basename($filename), $m);

		return strtolower($m[1]);
	}

	public static function isSubDir($path = NULL, $parent_folder) {
	    //Get directory path minus last folder
	    $dir = dirname($path);
	    $folder = substr($path, strlen($dir));

	    //Check the the base dir is valid
	    $dir = realpath($dir);

	    //Only allow valid filename characters
	    $folder = preg_replace('/[^a-z0-9\.\-_]/i', '', $folder);

	    //If this is a bad path or a bad end folder name
	    if( !$dir OR !$folder OR $folder === '.') {
	        return FALSE;
	    }

	    //Rebuild path
	    $path = $dir.DS.$folder;

	    //If this path is higher than the parent folder
	    if( strcasecmp($path, realpath($parent_folder)) > 0 ) {
	        return $path;
	    }

	    return false;
	}

	function writeCache($id, $content) {
		if (!is_dir(TEMP_DIR)) {
			mkdir(TEMP_DIR, 0777);
		}

		file_put_contents(TEMP_DIR.DS.$id, $content);
	}

	function getCache($id) {
		$file = TEMP_DIR.DS.$id;

		if (is_file($file)) {
			return file_get_contents(TEMP_DIR.DS.$id);
		}

		return false;
	}
}
?>