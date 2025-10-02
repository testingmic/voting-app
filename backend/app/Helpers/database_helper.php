<?php
global $databases, $alterTables, $votesTables, $notificationTables, $viewsTables, $chatRooms;

use CodeIgniter\Database\Exceptions\DatabaseException;

// Create the databases
$databases = [
    "CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        full_name TEXT,
        bio TEXT,
        gender TEXT,
        statistics TEXT,
        phone TEXT,
        position TEXT,
        user_type TEXT DEFAULT 'user',
        location TEXT DEFAULT NULL,
        organization_name TEXT DEFAULT NULL,
        organization_type TEXT DEFAULT NULL,
        two_factor_setup BOOLEAN DEFAULT 0,
        profile_image TEXT,
        status TEXT DEFAULT 'active',
        is_verified BOOLEAN DEFAULT 0,
        is_active BOOLEAN DEFAULT 1,
        last_login DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE UNIQUE INDEX IF NOT EXISTS user_id ON users (user_id);",

    "CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        setting TEXT NOT NULL,
        value TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE UNIQUE INDEX IF NOT EXISTS user_id ON settings (user_id, setting);",

    "CREATE TABLE IF NOT EXISTS user_token_auth (
        token_id INTEGER PRIMARY KEY AUTOINCREMENT,
        login TEXT,
        password TEXT UNIQUE,
        last_used DATETIME DEFAULT NULL,
        date_created DATETIME NOT NULL,
        date_expired DATETIME DEFAULT NULL
    );
    CREATE INDEX IF NOT EXISTS login ON user_token_auth (login);",

    "CREATE TABLE IF NOT EXISTS analytics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recordType VARCHAR(255) NOT NULL,
        totalCount INTEGER DEFAULT 0,
        recordContent TEXT DEFAULT '',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS recordType ON analytics (recordType);",
];

// alter tables
$alterTables = [
    "ALTER TABLE users ADD COLUMN organization_name TEXT",
    "ALTER TABLE users ADD COLUMN organization_type TEXT",
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