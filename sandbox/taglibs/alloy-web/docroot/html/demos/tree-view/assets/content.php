<?
	$limit = $_REQUEST['limit'];
	$start = $_REQUEST['start'];
	$end = $_REQUEST['end'];
	
	if ($end > 20) {
		echo "[]";
		die;
	}
?>
[
	<? for ($x = $start; $x < $end; $x++) { ?>
	{ "label": "io node <?=$x?>" },
	<? } ?>
	{
		"label": "testing",
		"type": "io"
	}
]