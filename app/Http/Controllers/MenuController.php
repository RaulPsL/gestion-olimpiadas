<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'menus' => 'required',
                'menus.*.title' => 'required|string',
                'menus.*.url' => 'required|string',
                'menus.*.icon' => 'required|string',
            ]);

            $menus = $request->input('menus');
            $newsMenus = [];
            foreach ($menus as $menu) {
                $newMenu = new Menu();
                $newMenu->title = $menu['title'];
                $newMenu->url = $menu['url'];
                $newMenu->icon = $menu['icon'];
                if ($menu['menu_id']) {
                    $newMenu->menu_id = $menu['menu_id'];
                }
                $newMenu->save();
                $newsMenus[] = $newMenu;
            }
            return response()->json([
                'message' => 'Menú creado correctamente',
                'data' => $newsMenus,
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Ocurrio un error en el servidor: ' . $th,
            ], 400);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
