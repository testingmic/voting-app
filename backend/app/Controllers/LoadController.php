<?php

namespace App\Controllers;

use App\Models\UsersModel;
use App\Models\AuthModel;
use App\Libraries\Routing;
use App\Libraries\Caching;
use App\Controllers\Analytics\Analytics;

class LoadController extends BaseController
{
    public $restrictedDomain = ['e-learning.com', 'e-learning.com'];
    
    protected $usersModel;
    protected $authModel;
    protected $analyticsObject;
    
    public function __construct($model = [])
    {
        // initialize the models
        $this->authModel = new AuthModel();
        $this->usersModel = new UsersModel();
        $this->analyticsObject = new Analytics();
        
        // initialize the cache object
        if(empty($this->cacheObject)) {
            $this->cacheObject = new Caching();
        }

        // get the last name of the class that has been called and trigger the model
        $childClass = get_called_class();
        $getLastName = explode('\\', $childClass);
        $triggeredModel = $getLastName[count($getLastName) - 1];

        $this->triggerModel(strtolower($triggeredModel));
    }

    /**
     * Trigger model
     * 
     * @param array $model
     * @return void
     */
    public function triggerModel($model) {
        
        $models = stringToArray($model);
        
        // Define a mapping of model names to their corresponding model classes
        $modelMap = [
        ];
        
        // Loop through the requested models and initialize them
        foreach ($models as $modelName) {
            if (isset($modelMap[$modelName])) {
                $propertyName = $modelName . 'Model';
                $this->{$propertyName} = !empty($this->{$propertyName}) ? $this->{$propertyName} : new $modelMap[$modelName]();
            }
        }
    }

}
