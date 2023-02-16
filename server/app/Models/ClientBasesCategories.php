<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientBasesCategories extends Model
{
    protected $table = 'client_bases_categories'; /* <== OPTIONAL */
    use HasFactory;

    protected $fillable = [
        'user',
        'category',
        'color',
    ];
}
