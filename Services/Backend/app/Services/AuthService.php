<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Validation\UnauthorizedException;

class AuthService {
    private $user;
    private $time;
    public function __construct(User $user)
    {
        $this->time = Carbon::now();
        $this->user = $user;
    }

    public function login(array $data)
    {
        if(auth()->attempt($data)){
            $expiresAt = $this->time->addDays(1);
            $token = auth()
                ->user()
                ->createToken('auth_token', [], $expiresAt)
                ->plainTextToken;

            return [
                "token" => $token,
                "expires_at" => $expiresAt
            ];
        }

        throw new UnauthorizedException("Email atau password salah", 401);
    }

    public function register(array $data)
    {
        $data['password'] = bcrypt($data['password']);
        $user = $this->user->create($data);
        return $user;
    }

    public function logout()
    {
        auth()->logout();
        return true;
    }
}

?>
