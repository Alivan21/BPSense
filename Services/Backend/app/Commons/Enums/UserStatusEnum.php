<?php

namespace App\Commons\Enums;

enum UserStatusEnum: int
{
    case ACTIVE = 0;
    case INACTIVE = 1;
    case NOTFOUND = 2;
}
