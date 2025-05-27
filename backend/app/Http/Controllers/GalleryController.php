<?php


namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    // List all gallery items
    public function index()
    {
        return response()->json(Gallery::all());
    }

    // Store a new gallery item
    public function store(Request $request)
    {
        $validated = $request->validate([
            'photo' => 'nullable|image|max:2048', // Accept image files up to 2MB
            'drive_link' => 'nullable|url|max:255',
            'caption' => 'nullable|string|max:255', // Add caption validation
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('gallery', 'public');
            $validated['photo'] = $path;
        }

        $gallery = Gallery::create($validated);
        return response()->json($gallery, 201);
    }

    // Show a single gallery item
    public function show($id)
    {
        $gallery = Gallery::findOrFail($id);
        return response()->json($gallery);
    }

    // Delete a gallery item
    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->delete();
        return response()->json(['message' => 'Gallery item deleted']);
    }
}