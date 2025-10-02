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
        'view:candidate_id' => [
            'method' => 'GET',
            'authenticate' => true,
            'payload' => [
                'candidate_id' => 'required|integer',
            ]
        ],
        'create' => [
            'method' => 'POST',
            'authenticate' => true,
            'is_admin' => true,
            'payload' => [
                'name' => 'required|max_length[100]',
                'email' => 'required|valid_email|max_length[100]',
                'achievements' => 'permit_empty|is_array',
                'education' => 'permit_empty|is_array',
                'experience' => 'permit_empty|is_array',
                'socialLinks' => 'permit_empty|is_array'
            ]
        ],
        'update:candidate_id' => [
            'method' => 'POST,PUT',
            'authenticate' => true,
            'payload' => [
                'candidate_id' => 'required|numeric',
                'achievements' => 'permit_empty|is_array',
                'education' => 'permit_empty|is_array',
                'experience' => 'permit_empty|is_array',
                'socialLinks' => 'permit_empty|is_array'
            ]
        ],
        'delete:candidate_id' => [
            'method' => 'DELETE',
            'authenticate' => true,
            'payload' => [
                'candidate_id' => 'required|integer',
            ]
        ]
    ];
}