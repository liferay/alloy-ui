<?
	$limit = $_REQUEST['limit'];
	$offset = $_REQUEST['offset'];
?>
[
	<? for ($x = $offset; $x < ($offset + $limit); $x++) { ?>
	{ "label": "io node <?=$x?>" },
	<? } ?>
	{
		"label": "testing",
		"type": "io"
	}
]