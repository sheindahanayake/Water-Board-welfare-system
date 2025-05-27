import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddMember from './AddMember';

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [searchEmpNo, setSearchEmpNo] = useState('');
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [deleteMsg, setDeleteMsg] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    // Fetch members from API
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://10.5.0.2:80/backend/public/api/admin/members', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const mapped = res.data.map(m => ({
          id: m.id,
          fullName: m.full_name,
          empNo: m.emp_no,
          telephone: m.telephone,
          birthDate: m.birth_date,
          maritalStatus: m.marital_status,
          familyRelation: Array.isArray(m.family_relation)
            ? m.family_relation
            : m.family_relation
              ? JSON.parse(m.family_relation)
              : [],
          familyDonation: m.family_donation,
          scholarshipGrade: Array.isArray(m.scholarship_grade)
            ? m.scholarship_grade
            : m.scholarship_grade
              ? JSON.parse(m.scholarship_grade)
              : [],
          scholarshipAmount: m.scholarship_amount,
        }));
        setMembers(mapped);
      } catch (err) {
        setMembers([]);
      }
    };
    fetchMembers();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = members.filter(member =>
      member.empNo.toLowerCase() === searchEmpNo.toLowerCase()
    );
    setFilteredMembers(found);
    setSelectedMember(found.length > 0 ? found[0] : null);
    setDeleteMsg('');
    setShowUpdateForm(false);
  };

  const handleClear = () => {
    setSearchEmpNo('');
    setFilteredMembers([]);
    setSelectedMember(null);
    setDeleteMsg('');
    setShowUpdateForm(false);
  };

  // Refresh member list after update or delete
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://10.5.0.2:80/backend/public/api/admin/members', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const mapped = res.data.map(m => ({
        id: m.id,
        fullName: m.full_name,
        empNo: m.emp_no,
        telephone: m.telephone,
        birthDate: m.birth_date,
        maritalStatus: m.marital_status,
        familyRelation: Array.isArray(m.family_relation)
          ? m.family_relation
          : m.family_relation
            ? JSON.parse(m.family_relation)
            : [],
        familyDonation: m.family_donation,
        scholarshipGrade: Array.isArray(m.scholarship_grade)
          ? m.scholarship_grade
          : m.scholarship_grade
            ? JSON.parse(m.scholarship_grade)
            : [],
        scholarshipAmount: m.scholarship_amount,
      }));
      setMembers(mapped);
      // Update filtered and selected member after update
      const found = mapped.filter(member =>
        member.empNo.toLowerCase() === searchEmpNo.toLowerCase()
      );
      setFilteredMembers(found);
      setSelectedMember(found.length > 0 ? found[0] : null);
      setShowUpdateForm(false);
    } catch {
      setMembers([]);
      setFilteredMembers([]);
      setSelectedMember(null);
      setShowUpdateForm(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedMember) return;
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://10.5.0.2:80/backend/public/api/admin/members/${selectedMember.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDeleteMsg('Member deleted successfully.');
      setSelectedMember(null);
      setSearchEmpNo('');
      setFilteredMembers([]);
      setShowUpdateForm(false);
      // Refresh member list
      const res = await axios.get('http://10.5.0.2:80/backend/public/api/admin/members', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const mapped = res.data.map(m => ({
        id: m.id,
        fullName: m.full_name,
        empNo: m.emp_no,
        telephone: m.telephone,
        birthDate: m.birth_date,
        maritalStatus: m.marital_status,
        familyRelation: Array.isArray(m.family_relation)
          ? m.family_relation
          : m.family_relation
            ? JSON.parse(m.family_relation)
            : [],
        familyDonation: m.family_donation,
        scholarshipGrade: Array.isArray(m.scholarship_grade)
          ? m.scholarship_grade
          : m.scholarship_grade
            ? JSON.parse(m.scholarship_grade)
            : [],
        scholarshipAmount: m.scholarship_amount,
      }));
      setMembers(mapped);
    } catch (err) {
      setDeleteMsg('Failed to delete member.');
    }
  };

  return (
    <div style={{
      maxWidth: 1000,
      margin: '40px auto',
      padding: 32,
      background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)',
      borderRadius: 18,
      boxShadow: '0 8px 32px rgba(60,60,120,0.10), 0 1.5px 6px rgba(0,0,0,0.07)'
    }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, color: '#2d3748', marginBottom: 24, textAlign: 'center', letterSpacing: 1 }}>
        View Member Details
      </h2>
      <form onSubmit={handleSearch} style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <label style={{ fontWeight: 500 }}>
          Search by EMP NO:{' '}
          <input
            type="text"
            value={searchEmpNo}
            onChange={e => setSearchEmpNo(e.target.value)}
            placeholder="Enter EMP NO"
            style={{
              padding: 8,
              width: 220,
              borderRadius: 8,
              border: '1px solid #cbd5e1',
              fontSize: 15,
              marginRight: 8
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: '8px 20px',
            background: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          style={{
            padding: '8px 20px',
            background: '#e2e8f0',
            color: '#2d3748',
            border: 'none',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            marginLeft: 4,
            transition: 'background 0.2s'
          }}
        >
          Clear
        </button>
      </form>
      {deleteMsg && (
        <div style={{ color: deleteMsg.includes('success') ? 'green' : 'red', marginBottom: 16, textAlign: 'center' }}>
          {deleteMsg}
        </div>
      )}
      {selectedMember && (
        <>
          <div style={{ overflowX: 'auto', marginBottom: 32 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: '#e0e7ff' }}>
                  <th style={{ borderBottom: '2px solid #cbd5e1', padding: 10 }}>Full Name</th>
                  <th style={{ borderBottom: '2px solid #cbd5e1', padding: 10 }}>EMP NO</th>
                  <th style={{ borderBottom: '2px solid #cbd5e1', padding: 10 }}>Telephone</th>
                  <th style={{ borderBottom: '2px solid #cbd5e1', padding: 10 }}>Birth Date</th>
                  <th style={{ borderBottom: '2px solid #cbd5e1', padding: 10 }}>Marital Status</th>
                  <th style={{ borderBottom: '2px solid #cbd5e1', padding: 10 }}>Family Relations</th>
                  <th style={{ borderBottom: '2px solid #cbd5e1', padding: 10 }}>Donation</th>
                  <th style={{ borderBottom: '2px solid #cbd5e1', padding: 10 }}>Scholarship Grade</th>
                  <th style={{ borderBottom: '2px solid #cbd5e1', padding: 10 }}>Scholarship Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ borderBottom: '1px solid #eee', padding: 10 }}>{selectedMember.fullName}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 10 }}>{selectedMember.empNo}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 10 }}>{selectedMember.telephone}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 10 }}>{selectedMember.birthDate}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 10 }}>{selectedMember.maritalStatus}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 10 }}>
                    {selectedMember.familyRelation && selectedMember.familyRelation.join(', ')}
                  </td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 10 }}>{selectedMember.familyDonation}</td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 10 }}>
                    {selectedMember.scholarshipGrade && selectedMember.scholarshipGrade.join(', ')}
                  </td>
                  <td style={{ borderBottom: '1px solid #eee', padding: 10 }}>{selectedMember.scholarshipAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
            <button
              onClick={handleDelete}
              style={{
                background: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 24px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                marginRight: 8,
                transition: 'background 0.2s'
              }}
            >
              Delete Member
            </button>
            <button
              onClick={() => setShowUpdateForm(!showUpdateForm)}
              style={{
                background: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 24px',
                fontWeight: 600,
                fontSize: 16,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              {showUpdateForm ? 'Cancel Update' : 'Update Member'}
            </button>
          </div>
          {showUpdateForm && (
            <AddMember member={selectedMember} onUpdate={handleUpdate} />
          )}
        </>
      )}
    </div>
  );
};

export default ViewMembers;