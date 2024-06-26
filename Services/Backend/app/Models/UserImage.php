<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserImage extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'path',
    ];

    /**
     * Get the user that owns the UserImage
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function officer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
