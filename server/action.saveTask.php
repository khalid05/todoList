<?php
require_once './common/init.php';

/* @var $dao TodoList\Dao */


$idTask = $_GET['idtask'];
$name = $_GET['name'];

$allTasks = $dao->saveTask($idTask, $name);

header('Content-type: application/json');
echo json_encode($allTasks);