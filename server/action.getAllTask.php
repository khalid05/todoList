<?php
require_once './common/init.php';

/* @var $dao TodoList\Dao */


$allTasks = $dao->getTasks();
var_dump($allTasks);
echo json_encode($allTasks);