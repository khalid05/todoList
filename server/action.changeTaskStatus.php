<?php
require_once './common/init.php';

/* @var $dao TodoList\Dao */


$idTask = $_GET['idtask'];
$status = $_GET['status'];

$allTasks = $dao->updateTaskStatus($idTask, $status);

header('Content-type: application/json');
echo json_encode($allTasks);