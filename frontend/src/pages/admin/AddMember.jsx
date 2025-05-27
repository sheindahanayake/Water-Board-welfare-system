import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FAMILY_OPTIONS = ["Mother", "Father", "Uncle", "Aunty"];
const SCHOLARSHIP_OPTIONS = ["Grade 5", "OL", "AL"];

const AddMember = ({ member, onUpdate }) => {
  const [form, setForm] = useState({
    fullName: '',
    empNo: '',
    telephone: '',
    birthDate: '',
    maritalStatus: '',
    familyRelation: [],
    familyDonation: '',
    scholarshipGrade: [],
    scholarshipAmount: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (member) {
      setForm({
        fullName: member.fullName || '',
        empNo: member.empNo || '',
        telephone: member.telephone || '',
        birthDate: member.birthDate || '',
        maritalStatus: member.maritalStatus || '',
        familyRelation: member.familyRelation || [],
        familyDonation: member.familyDonation || '',
        scholarshipGrade: member.scholarshipGrade || [],
        scholarshipAmount: member.scholarshipAmount || '',
      });
    }
  }, [member]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (name, value) => {
    setForm((prev) => {
      const arr = prev[name];
      if (arr.includes(value)) {
        return { ...prev, [name]: arr.filter((v) => v !== value) };
      } else {
        return { ...prev, [name]: [...arr, value] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const payload = {
        full_name: form.fullName,
        emp_no: form.empNo,
        telephone: form.telephone,
        birth_date: form.birthDate,
        marital_status: form.maritalStatus,
        family_relation: form.familyRelation,
        family_donation: form.familyDonation,
        scholarship_grade: form.scholarshipGrade,
        scholarship_amount: form.scholarshipAmount,
      };

      if (member) {
        // Update member
        await axios.put(
          `http://10.5.0.2:80/backend/public/api/admin/members/${member.id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess('Member updated successfully!');
        if (onUpdate) onUpdate(); // Call update callback if provided
      } else {
        // Add member
        await axios.post(
          'http://10.5.0.2:80/backend/public/api/admin/members',
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuccess('Member added successfully!');
        setForm({
          fullName: '',
          empNo: '',
          telephone: '',
          birthDate: '',
          maritalStatus: '',
          familyRelation: [],
          familyDonation: '',
          scholarshipGrade: [],
          scholarshipAmount: '',
        });
        if (onUpdate) onUpdate(); // Call update callback if provided
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to submit. Please check your input and try again.'
      );
    }
  };

  // Button hover effect
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      style={{
        maxWidth: 540,
        margin: '40px auto',
        padding: 32,
        background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)',
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(60,60,120,0.10), 0 1.5px 6px rgba(0,0,0,0.07)',
      }}
    >
      <h2 style={{ fontSize: 28, fontWeight: 700, color: '#2d3748', marginBottom: 24, textAlign: 'center', letterSpacing: 1 }}>
        {member ? 'Update Member Details' : 'Add Member Details'}
      </h2>
      {error && <div style={{ color: 'red', marginBottom: 12, textAlign: 'center' }}>{error}</div>}
      {success && <div style={{ color: 'green', marginBottom: 12, textAlign: 'center' }}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gap: 18 }}>
          {/* ...form fields remain unchanged... */}
          <div>
            <label style={{ fontWeight: 500 }}>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                marginTop: 4,
                fontSize: 15,
              }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>EMP NO:</label>
            <input
              type="text"
              name="empNo"
              value={form.empNo}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                marginTop: 4,
                fontSize: 15,
              }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Telephone No:</label>
            <input
              type="text"
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                marginTop: 4,
                fontSize: 15,
              }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Birth Date:</label>
            <input
              type="date"
              name="birthDate"
              value={form.birthDate}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                marginTop: 4,
                fontSize: 15,
              }}
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Married or Unmarried:</label>
            <select
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                marginTop: 4,
                fontSize: 15,
                background: '#fff'
              }}
            >
              <option value="">Select</option>
              <option value="Married">Married</option>
              <option value="Unmarried">Unmarried</option>
            </select>
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Family Member Relation:</label>
            <div style={{
              border: '1px solid #cbd5e1',
              borderRadius: 8,
              padding: 10,
              background: '#f1f5f9',
              marginTop: 4,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12
            }}>
              {FAMILY_OPTIONS.map(option => (
                <label key={option} style={{ display: 'flex', alignItems: 'center', fontWeight: 400 }}>
                  <input
                    type="checkbox"
                    checked={form.familyRelation.includes(option)}
                    onChange={() => handleMultiSelect('familyRelation', option)}
                    style={{ marginRight: 6 }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Dead Donation Amount:</label>
            <input
              type="number"
              name="familyDonation"
              value={form.familyDonation}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                marginTop: 4,
                fontSize: 15,
              }}
              min="0"
            />
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Scholarship Grade:</label>
            <div style={{
              border: '1px solid #cbd5e1',
              borderRadius: 8,
              padding: 10,
              background: '#f1f5f9',
              marginTop: 4,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12
            }}>
              {SCHOLARSHIP_OPTIONS.map(option => (
                <label key={option} style={{ display: 'flex', alignItems: 'center', fontWeight: 400 }}>
                  <input
                    type="checkbox"
                    checked={form.scholarshipGrade.includes(option)}
                    onChange={() => handleMultiSelect('scholarshipGrade', option)}
                    style={{ marginRight: 6 }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontWeight: 500 }}>Scholarship Amount:</label>
            <input
              type="number"
              name="scholarshipAmount"
              value={form.scholarshipAmount}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #cbd5e1',
                marginTop: 4,
                fontSize: 15,
              }}
              min="0"
            />
          </div>
          <button
            type="submit"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{
              padding: '12px 0',
              width: '100%',
              background: member
                ? (isHover ? '#218838' : '#28a745')
                : (isHover ? '#0056b3' : '#007bff'),
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 17,
              letterSpacing: 1,
              boxShadow: isHover ? '0 2px 8px rgba(0,0,0,0.10)' : 'none',
              transition: 'background 0.2s, box-shadow 0.2s'
            }}
          >
            {member ? 'Update' : 'Add Member'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMember;