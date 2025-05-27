<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'emp_no',
        'telephone',
        'birth_date',
        'marital_status',
        'family_relation',
        'family_donation',
        'scholarship_grade',
        'scholarship_amount',
    ];

    // If you want to automatically cast JSON columns to arrays
    protected $casts = [
        'family_relation' => 'array',
        'scholarship_grade' => 'array',
    ];
}