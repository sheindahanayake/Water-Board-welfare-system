<?php


namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    // List all members
    public function index()
    {
        return response()->json(Member::all());
    }

    // Store a new member
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'emp_no' => 'required|string|max:255|unique:members,emp_no',
            'telephone' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date',
            'marital_status' => 'nullable|string|max:50',
            'family_relation' => 'nullable|array',
            'family_donation' => 'nullable|numeric',
            'scholarship_grade' => 'nullable|array',
            'scholarship_amount' => 'nullable|numeric',
        ]);

        // Store arrays as JSON
        $validated['family_relation'] = isset($validated['family_relation']) ? json_encode($validated['family_relation']) : null;
        $validated['scholarship_grade'] = isset($validated['scholarship_grade']) ? json_encode($validated['scholarship_grade']) : null;

        $member = Member::create($validated);

        return response()->json($member, 201);
    }

    // Show a single member
    public function show(Member $member)
    {
        return response()->json($member);
    }

    // Update a member
    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'full_name' => 'sometimes|required|string|max:255',
            'emp_no' => 'sometimes|required|string|max:255|unique:members,emp_no,' . $member->id,
            'telephone' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date',
            'marital_status' => 'nullable|string|max:50',
            'family_relation' => 'nullable|array',
            'family_donation' => 'nullable|numeric',
            'scholarship_grade' => 'nullable|array',
            'scholarship_amount' => 'nullable|numeric',
        ]);

        // Store arrays as JSON
        if (isset($validated['family_relation'])) {
            $validated['family_relation'] = json_encode($validated['family_relation']);
        }
        if (isset($validated['scholarship_grade'])) {
            $validated['scholarship_grade'] = json_encode($validated['scholarship_grade']);
        }

        $member->update($validated);

        return response()->json($member);
    }

    // Delete a member
    public function destroy(Member $member)
    {
        $member->delete();
        return response()->json(['message' => 'Member deleted']);
    }
}