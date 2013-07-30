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
            throw new Exception('Une erreur est survenue durant la requête : ' . $queryStatement->errorInfo());
        }

        return $result;
    }

}

?>
