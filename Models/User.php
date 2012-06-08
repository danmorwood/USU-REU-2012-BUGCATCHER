<?php

require_once 'Model.php';
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of User
 *
 * @author danielbokser
 */
class User extends Model{
    
    /**
     *Constructs a user using a given unique value 
     * @param type $value unique vale (primary key by default)
     * @param type $fieldName name of the unique field
     */
    public function __construct($value, $fieldName = FALSE) {
        parent::__construct('USERS', $value, $fieldName);
    }
    
    
    
    
}

?>
