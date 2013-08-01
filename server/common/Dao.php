<?php

namespace TodoList;

class Dao
{

    /**
     *
     * @var  PDO
     */
    private $database;

    function __construct()
    {
        $this->database = new \PDO('mysql:host=localhost;port=3306;dbname=todolist;charset=utf8',
                                   'root', 'root');
    }

    public function getTasks($limit = 20, $offset = 0)
    {
        $query = sprintf('SELECT * FROM tasks LIMIT %d, %d;', $offset, $limit);
        $resultStatement = $this->database->query($query);

        $result = $resultStatement->fetchAll(\PDO::FETCH_OBJ);

        return $result;
    }

    public function updateTaskStatus($idTask, $status)
    {
        $query = sprintf('UPDATE tasks SET status = :status WHERE idtask = :idtask;');
        $queryStatement = $this->database->prepare($query);

        $queryStatement->bindParam('idtask', $idTask);
        $queryStatement->bindParam('status', $status);

        $result = $queryStatement->execute();

        if (FALSE === $result) {
            throw new \Exception('Une erreur est survenue durant l\'exécution de la requête : ' . $queryStatement->errorInfo());
        }

        return $result;
    }

    public function saveTask($idTask, $name, $status = 0)
    {
        if (null !== $idTask && FALSE === empty($idTask)) {
            $query = sprintf('UPDATE tasks SET name = :name WHERE idtask = :idtask;');
            $queryStatement = $this->database->prepare($query);

            $queryStatement->bindParam('idtask', $idTask);
            $queryStatement->bindParam('name', $name);
        } else {
            $query = sprintf('INSERT INTO tasks (idtask, name, status) VALUES (NULL, :name, :status);');
            $queryStatement = $this->database->prepare($query);

            $queryStatement->bindParam('name', $name);
            $queryStatement->bindParam('status', $status);
        }

        $result = $queryStatement->execute();

        if (FALSE === $result) {
            throw new \Exception('Une erreur est survenue durant l\'exécution de la requête : ' . json_encode($queryStatement->errorInfo()));
        }

        if (null !== $idTask && FALSE === empty($idTask)) {
            $id = $idTask;
        } else {
            $id = $this->database->lastInsertId();
        }

        return (int) $id;
    }

}

?>
