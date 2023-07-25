<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Validation\UnauthorizedException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Facades\JWTFactory;

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
        if (is_numeric($data['identifier']) && $data['identifier']) {
            $data['nip'] = $data['identifier'];
        } else {
            $data['username'] = $data['identifier'];
        }

        unset($data['identifier']);

        if(auth()->attempt($data)){
            $expiresAt = $this->time->addDays(1);

            $payload = JWTFactory::sub(auth()->user()->id)
                ->role(auth()->user()->role->name)
                ->make();

            return [
                "token" => JWTAuth::encode($payload)->get(),
                "expires_at" => $expiresAt,
            ];
        }

        throw new UnauthorizedException("Credential salah", 401);
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
