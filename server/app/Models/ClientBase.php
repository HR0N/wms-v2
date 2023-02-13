<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientBase extends Model
{
    protected $table = 'client_base'; /* <== OPTIONAL */
    use HasFactory;

    protected $fillable = [
        'phone',
        'name',
        'occupation',
        'status',
        'comment',
        'category',
        'date'
    ];
}
