<?php
global $databases, $alterTables, $votesTables, $notificationTables, $viewsTables, $chatRooms;

use CodeIgniter\Database\Exceptions\DatabaseException;

// Create the databases
$databases = [];

// alter tables
$alterTables = [
    // "ALTER TABLE posts ADD COLUMN post_uuid TEXT",
];

function createDatabaseStructure() {
    global $databases, $alterTables;
    foreach(['tests' => $databases] as $idb => $tables) {
        $db = \Config\Database::connect($idb);
        foreach(array_merge($tables, $alterTables) as $query) {
            try {
                $db->query($query);
            } catch(DatabaseException $e) { }
        }
    }
}

/**
 * Set the database settings
 * 
 * @param object $dbHandler
 * 
 * @return void
 */
function setDatabaseSettings($dbHandler) {
    $dbHandler->query("PRAGMA journal_mode = WAL");
    $dbHandler->query("PRAGMA synchronous = NORMAL");
    $dbHandler->query("PRAGMA locking_mode = NORMAL");
    $dbHandler->query("PRAGMA busy_timeout = 5000");
    $dbHandler->query("PRAGMA cache_size = -16000");
}
?>