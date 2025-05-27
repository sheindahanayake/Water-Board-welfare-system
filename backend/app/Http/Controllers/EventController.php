<?php
namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    // List all events
    public function index()
    {
        return response()->json(Event::all());
    }

    // Store a new event
    public function store(Request $request)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'month' => 'required|string|size:2',
            'year' => 'required|string|size:4',
        ]);

        $event = Event::create($validated);
        return response()->json($event, 201);
    }

    // Show a single event
    public function show($id)
    {
        $event = Event::findOrFail($id);
        return response()->json($event);
    }

    // Update an event
    public function update(Request $request, $id)
    {
        $event = Event::findOrFail($id);
        $validated = $request->validate([
            'description' => 'sometimes|required|string|max:255',
            'month' => 'sometimes|required|string|size:2',
            'year' => 'sometimes|required|string|size:4',
        ]);
        $event->update($validated);
        return response()->json($event);
    }

    // Delete an event
    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();
        return response()->json(['message' => 'Event deleted']);
    }
}