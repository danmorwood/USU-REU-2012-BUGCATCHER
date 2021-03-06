<?php

require_once dirname(__FILE__) . '/../Constants/Constants.php';
require_once dirname(__FILE__) . '/../Database/Connection.php';
require_once dirname(__FILE__) . '/../Exceptions/BugCatcherExceptions.php';

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Abstract model class which includes methods for loading and updating
 * fields automatically.  Since this class is abstract you cannot instiate it.
 * All model classes should subclass from this one.  
 * 
 * I am gonna try to make it so that you shouldn't even have to instantiate Models subclasses directly.
 * Model subclasses will have static factory methods that will return a fully loaded model object.
 * ______________________________________________________________________________________________________
 * 
 * To access and modify attributes, use the following form: $model->attributeName.
 * 
 * Examples: 
 * - To access the user name of a User:  $username = $user->username; 
 * - Setting the nickname of an Admin: $admin->nickname = 'nickname';
 * 
 * When ever you change the 'password' field of an object, it is automatically hashed.
 * When changing the password, CHANGE IT USING PLAIN TEXT.
 * 
 * Whenever you are finished changing attribute you MUST call $model->commitToDB() to save 
 * your changes to the database.
 * 
 * Relations (like the Teams a User is on) are not implemented yet.
 * 
 * 
 *
 * @author danielbokser
 */
abstract class Model {
    
    /**dictionary that holds field values using the field names as keys*/
    protected $values = array();
    /**dictionary that holds the types of the fields sorted by the field names*/
    protected $types = array(); 
    /**holds mysql connection*/
    protected $connection;
    /**holds the table name that this model represents*/
    protected $tableName;
    
    /**stores the primary key.  
    it is private since subclasses will specify it by its actual field*/
    private $uniqueFieldValue;

    private $uniqueFieldName;
    
    private $primaryKeyName;
    
    /**will hold the link table names*/
    private $linkTables; 
   
    


   
    /**
     * 
     * @param string $tableName name of the table 
     * @param string/int $uniqueValue Unique value to get this user from
     * @param string $uniqueFieldName Optional, defaults to the primary key if not specified. If specified make sure it is a unique field!
     * @param array $relationTables Optional, if the model belongs in a link table specify the tables here
     */
    public function __construct($tableName, $uniqueValue, $uniqueFieldName = FALSE, array $linkTables = NULL) {
        //connect to the database 
        $this->connection = connectToDB();
        $this->tableName = $tableName;
        $this->uniqueFieldValue = $uniqueValue;
        
        if($uniqueFieldName)
            $this->uniqueFieldName = $uniqueFieldName;
        
        if($linkTables)
            $this->linkTables = $linkTables;
        
        $this->load();
        
        
            
    }


    /**
     * Gets the field 
     * @param string $field name of field
     * @return mixed value of field
     */
    public function __get($field)
    {
        if(!isset($this->types[$field]))
            throw new BugCatcherException($field . ' is not an attribute of this table');
        
        return $this->values[$field];
    }
    
    /**
     *Sets the given field
     * @param string $field name of field
     * @param mixed $value
     * @throws Exception if you are trying to change the primary key
     */
    public function __set($field, $value)
    {
        //primary key is immutable
        if($this->primaryKeyName === $field && isset($this->values[$field]))
        {
            throw new BugCatcherException('Cannot change primary key');
        }
        
        if(!isset($this->types[$field]))
            throw new BugCatcherException($field . ' is not an attribute of this table');
        
        
        
        //if we are changing the password, hash it first
        if($field === 'password' && isset($this->values['password']))
        {
            $value = crypt($value, SALT);
        }
        
        $this->values[$field] = $value;
    }
    

    /**
     * Loads all of the fields in
     * @throws Exception if query fails
     */
    protected function load()
    {
        $this->getFieldTypes();
        
        //if the unique value is is a string, enclose it in quotes
        $searchValue = ($this->types[$this->uniqueFieldName] === 's') ? "'" . $this->uniqueFieldValue . "'" : 
            $this->uniqueFieldValue;
        
        if(!$result = $this->connection->query('SELECT * FROM ' . $this->tableName . ' WHERE ' . $this->uniqueFieldName
                . '=' . $searchValue))
               throw new BugCatcherException('Query Failed: ' . $this->connection->error);
        
        //populate the fields
        if(($row = $result->fetch_assoc()))
        {
            foreach ($this->types as $fieldName => $type) 
            {
                
                $this->$fieldName = $row[$fieldName];
            }
        }
        else
        {
            throw new BugCatcherException($this->uniqueFieldName . ' "'. $this->uniqueFieldValue . '" not found');
        }
    }
    
    /**
     *This function commits all of its fields to the database 
     */
    public function commitToDB()
    {
        $sql = 'UPDATE ' . $this->tableName . ' SET ';
        $value; //used to hold a value of a field
        
        //get all field names and their values
        foreach($this->types as $fieldName => $type)
        {
            //cannot change primary key
            if($type === 'pk')
                continue;
            
            $sql .= $fieldName . '=';
            
            
            
            if($this->$fieldName === NULL)
            {
                $value = 'NULL';
            }
            //field is a string, wrap the value in quotes
            elseif($type === 's') 
            {
                $value = "'" . $this->$fieldName . "'";
            }
            //field is an int
            elseif($type === 'i')
            {
                $value = $this->$fieldName;
            }
            //field doesn't have a type, something went wrong...
            else
            {
                throw new BugCatcherException('Trying to update a field that doesn\'t exist:' . $fieldName);
            }
            
            $sql .= $value . ",";
            
            
        }
        
        //chop off the last comma
        $sql = substr($sql, 0, -1);
        
        $sql .= ' WHERE ' . $this->primaryKeyName . ' = ' . $this->values[$this->primaryKeyName];
         
        if(!$this->connection->query($sql))
            throw new BugCatcherException('Update query failed: ' . $this->connection->error);
    }
    
    
    
    




    //helper functions
    
    
    private function loadLinks()
    {
        foreach($this->linkTables as $linkTableName)
        {
            
        }
    }
    
    /**
     * Sets up the type mapping betwen the field
     * @throws type 
     */
    private function getFieldTypes()
    {
        $fieldType = ''; //temp for holding the type of the field
       if(!$result = $this->connection->query('SHOW COLUMNS FROM ' . $this->tableName))
               throw new BugCatcherException('Query Failed: ' . $this->connection->error);
       
       while(($row = $result->fetch_assoc()))
       {
           //check to see if the uniqueFieldName is actually unique
           if($row['Field'] === $this->uniqueFieldName && $row['Key'] !== 'UNI' && $row['Key'] !== 'PRI')
           {
               var_dump($row);
               throw new BugCatcherException('Search value must be unique!');
           }
           
           //if field is a primary key, save it as such
           if($row['Key'] === 'PRI')
           {
               //if uniqueField is not set, use the name
               if(!isset($this->uniqueFieldName))
                   $this->uniqueFieldName = $row['Field'];
               
               
               $this->primaryKeyName = $row['Field'];
               
           }
           
           
           if (strpos($row['Type'], 'text') !== FALSE || strpos($row['Type'], 'char') !== FALSE)
           {
               
               $fieldType = 's';
           }
               
           elseif (strpos($row['Type'], 'int') !== FALSE || strpos($row['Type'], 'bool') !== FALSE)
           {
               $fieldType = 'i';
           }
           elseif (strpos($row['Type'], 'date') !== FALSE)
           {
               $fieldType = 's';
           }
           //the database contains a type we do not support
           else
           {
               throw new BugCatcherException('Database contains a type we do not support');
           }
           
           $this->types[$row['Field']] = $fieldType;
           
           
                
       }
    }
    
    /**
     * Adds a row to the database
     * 
     * @param string $tablename the name of the table to insert the row into
     * @param array $data must be a dictionary where the field names are keys and field values are the values.\
     * if the value is a string, IT MUST BE ENCLOSED IN SINGLE QUOTES
     */
    public static function addRow($tablename, array $data)
    {
        $sql = 'INSERT INTO ' . $tablename . ' (';
        
        //holds the values list
        $values = 'VALUES (';
        
        //construct the insert query
        foreach($data as $fieldName => $value)
        {
          //hash the password
          if($fieldName === 'password')
              $value = "'" . crypt ($value, SALT) . "'";
              
          $sql .= $fieldName . ',';
          $values .= $value . ',';
          
        }
        
        //remove the last commas for both the field names and the values
        $sql = substr($sql, 0, -1);
        $values = substr($values, 0, -1);
        
        
        $sql .= ') ';  
        $values .= ')';
        
        $sql .= $values;
        
       
        $con = connectToDB();
        
        if(!$con->query($sql))
           throw new ModelAlreadyExistsException('Error inserting into database: ' . $con->error);
    }
}


?>
