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
    
    public static function login($username, $password)
    {
        
        try{
            $user = new User($username, 'username');
            
            if($user->password !== crypt($password, SALT))
                    return FALSE;
            
            return $user;
        }
        catch(BugCatcherException $ex)
        {
            echo $ex->getMessage();
            return FALSE;
            
        }
        
        
        
    }
    
    public static function registerUser(array $registerData)
    {
        
        foreach($registerData as $fieldName => &$value)
        {
            $value = "'" . $value . "'";
        }
        
        Model::addRow('USERS', $registerData);
    }
    
    
    
}

?>
