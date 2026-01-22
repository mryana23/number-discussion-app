import React, { useState } from 'react';
import { postsAPI } from '../../services/api';

interface CreatePostProps {
  onPostCreated: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [startNumber, setStartNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const number = parseFloat(startNumber);
    if (isNaN(number)) {
      setError('Please enter a valid number');
      return;
    }

    setLoading(true);

    try {
      await postsAPI.createStartNumber(number);
      setStartNumber('');
      onPostCreated();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '20px', padding: '15px', border: '2px solid #007bff', borderRadius: '5px' }}>
      <h3>Start New Calculation Chain</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Starting Number:</label>
          <input
            type="number"
            step="any"
            value={startNumber}
            onChange={(e) => setStartNumber(e.target.value)}
            required
            style={{ width: '200px', padding: '8px', fontSize: '14px' }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '8px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;