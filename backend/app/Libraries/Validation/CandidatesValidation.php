<?php
namespace App\Libraries\Validation;

class CandidatesValidation {

    public $routes = [
        'list' => [
            'method' => 'GET',
            'authenticate' => true,
            'payload' => [
                'page' => 'permit_empty|integer',
                'limit' => 'permit_empty|integer',
            ]
        ],
        'view:user_id' => [
            'method' => 'GET',
            'authenticate' => true,
            'payload' => [
                'user_id' => 'required|integer',
            ]
        ],
        'create' => [
            'method' => 'POST',
            'authenticate' => true,
            'is_admin' => true,
            'payload' => [
                'full_name' => 'required|max_length[100]',
                'email' => 'required|valid_email|max_length[100]',
                'password' => 'required|valid_password|min_length[8]|max_length[32]',
                'status' => 'required|string|in_list[active,inactive,blocked,pending,suspended]',
            ]
        ],
        'update:user_id' => [
            'method' => 'POST,PUT',
            'authenticate' => true,
            'payload' => [
                'user_id' => 'required|integer',
                'name' => 'string|max_length[32]',
                'gender' => 'string|in_list[Male,Female,Other]',
                'setting' => 'string|max_length[100]',
                'value' => 'max_length[100]',
            ]
        ]
    ];
}