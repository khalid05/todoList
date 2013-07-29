<?php
require_once './common/init.php';

/* @var $dao TodoList\Dao */


$allTasks = $dao->getTasks();

echo json_encode($allTasks);