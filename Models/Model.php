<?php

require_once dirname(__FILE__) . '/../Constants/Constants.php';
require_once dirname(__FILE__) . '/../Database/Connection.php';
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Abstract model class which includes methods for loading and updating
 * fields automatically
 * All model classes should subclass from this one
 *
 * @author danielbokser
 */
abstract class Model {
    
    //dictionary that holds field values using the field names as keys
    protected $values = array();
    //dictionary that holds the types of the fields sorted by the field names
    protected $types = array(); 
    //holds mysql connection
    protected $connection;
    //holds the table name that this model represents
    protected $tableName;
    
    //stores the primary key.  
    //it is private since subclasses will specify it by its actual field
    private $uniqueFieldValue;

    private $uniqueFieldName;
    


   
    /**
     * 
     * @param type $tableName name of the table 
     * @param type $uniqueValue Unique value to get this user from
     * @param type $uniqueFieldName Optional, defaults to the primary key if not specified. If specified make sure it is a unique field!
     */
    public function __construct($tableName, $uniqueValue, $uniqueFieldName = FALSE) {
        //connect to the database 
        $this->connection = connectToDB();
        $this->tableName = $tableName;
        $this->uniqueFieldValue = $uniqueValue;
        
        if($uniqueFieldName)
            $this->uniqueFieldName = $uniqueFieldName;
        
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
            throw new Exception($field . ' is not an attribute of this table');
        
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
        if($this->types[$field] === 'pk' && isset($this->values[$field]))
        {
            throw new Exception('Cannot change primary key');
        }
        
        if(!isset($this->types[$field]))
            throw new Exception($field . ' is not an attribute of this table');
        
        
        
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
               throw new Exception('Query Failed: ' . $this->connection->error);
        
        //populate the fields
        if(($row = $result->fetch_assoc()))
        {
            foreach ($this->types as $fieldName => $type) 
            {
                
                $this->$fieldName = $row[$fieldName];
            }
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
                throw new Exception('Trying to update a field that doesn\'t exist:' . $fieldName);
            }
            
            $sql .= $value . ",";
            
            
        }
        
        //chop off the last comma
        $sql = substr($sql, 0, -1);
        
        
        if(!$this->connection->query($sql))
            throw new Exception('Update query failed: ' . $this->connection->error);
    }
    
    
    
    




    //helper functions
    
    /**
     * Sets up the type mapping betwen the field
     * @throws type 
     */
    private function getFieldTypes()
    {
        $fieldType = ''; //temp for holding the type of the field
       if(!$result = $this->connection->query('SHOW COLUMNS FROM ' . $this->tableName))
               throw new Exception('Query Failed: ' . $this->connection->error);
       
       while(($row = $result->fetch_assoc()))
       {
           //check to see if the uniqueFieldName is actually unique
           if($row['Field'] === $this->uniqueFieldName && $row['Key'] !== 'UNI' && $row['Key'] !== 'PRI')
           {
               var_dump($row);
               throw new Exception('Search value must be unique!');
           }
           
           //if field is a primary key, save it as such
           if($row['Key'] === 'PRI' && !isset($this->uniqueFieldName))
           {
               
               $this->uniqueFieldName = $row['Field'];
               $fieldType = 'pk';
           }
           
           
           elseif (strpos($row['Type'], 'text') !== FALSE || strpos($row['Type'], 'char') !== FALSE)
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
               throw new Exception('Database contains a type we do not support');
           }
           
           $this->types[$row['Field']] = $fieldType;
           
           
                
       }
    }
}


?>
