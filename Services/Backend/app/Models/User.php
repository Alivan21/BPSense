<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * @property int $id
 * @property string $nip
 * @property string $name
 * @property string $email
 * @property string $phone_number
 * @property string $password
 * @property string $role_id
**/
class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nip',
        'name',
        'birth_date',
        'status',
        'username',
        'email',
        'phone',
        'profile',
        'qrcode',
        'password',
        'role_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    // /**
    //  * Get the value indicating whether the IDs are incrementing.
    //  *
    //  * @return bool
    //  */
    // public function getIncrementing()
    // {
    //     return false;
    // }

    // /**
    //  * Get the auto-incrementing key type.
    //  *
    //  * @return string
    //  */
    // public function getKeyType()
    // {
    //     return 'string';   
    // }

    //     /**
    //  * The "booting" function of model
    //  *
    //  * @return void
    //  */
    // protected static function boot() {
        // static::creating(function ($model) {
        //     if ( ! $model->getKey()) {
        //         $model->{$model->getKeyName()} = (string) Str::uuid();
        //     }
        // });        
        // parent::boot();

        // static::creating(function ($user) {
        //     // Set a default password for new users
        //     $user->password = Hash::make('password');
        // });
    // }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Get all of the images for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function images(): HasMany
    {
        return $this->hasMany(UserImage::class, 'user_id', 'id');
    }

    /**
     * Get the role that owns the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id', 'id');
    }
}
