<?php
require_once './common/init.php';

/* @var $dao TodoList\Dao */


$allTasks = $dao->getTasks();

header('Content-type: application/json');
echo json_encode($allTasks);