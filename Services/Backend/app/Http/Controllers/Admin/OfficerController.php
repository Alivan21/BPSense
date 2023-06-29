<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\OfficerResource;
use App\Models\User;
use Illuminate\Http\Request;

class OfficerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $officers = User::with(['images', 'role'])->whereHas('role', function ($query) {
            $query->where('name', 'officer');
        })->orderBy('created_at')->get();
        return OfficerResource::collection($officers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $officer
     * @return \Illuminate\Http\Response
     */
    public function show(User $officer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $officer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $officer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $officer
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $officer)
    {
        //
    }

    public function search()
    {
        //
    }
}
