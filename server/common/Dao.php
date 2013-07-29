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
        $this->database = new \PDO('mysql:host=localhost;port3306;dbname=todolist;',
                                   'root', 'root');
        $this->database->query('USE todolist;');
    }

    public function getTasks($limit = 20, $offset = 0)
    {
        $query = sprintf('SELECT * FROM tasks LIMIT %d, %d;', $offset, $limit);
        $resultStatement = $this->database->query($query);

        $result = $resultStatement->fetchAll();

        return $result;
    }

}

?>
