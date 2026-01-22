import React, { useState } from 'react';
import { postsAPI } from '../../services/api';

interface AddOperationProps {
  parentId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const AddOperation: React.FC<AddOperationProps> = ({ parentId, onSuccess, onCancel }) => {
  const [operation, setOperation] = useState<'+' | '-' | '*' | '/'>('+');
  const [operand, setOperand] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const number = parseFloat(operand);
    if (isNaN(number)) {
      setError('Please enter a valid number');
      return;
    }

    if (operation === '/' && number === 0) {
      setError('Cannot divide by zero');
      return;
    }

    setLoading(true);

    try {
      await postsAPI.addOperation(parentId, operation, number);
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add operation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '3px' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '12px' }}>Operation:</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as '+' | '-' | '*' | '/')}
            style={{ padding: '5px', fontSize: '14px', marginRight: '10px' }}
          >
            <option value="+">+ (Add)</option>
            <option value="-">- (Subtract)</option>
            <option value="*">* (Multiply)</option>
            <option value="/">/ (Divide)</option>
          </select>
          <input
            type="number"
            step="any"
            value={operand}
            onChange={(e) => setOperand(e.target.value)}
            placeholder="Enter number"
            required
            style={{ padding: '5px', fontSize: '14px', width: '120px' }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: '10px', fontSize: '12px' }}>{error}</div>}
        <div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '5px 15px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '12px',
              marginRight: '10px'
            }}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '5px 15px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOperation;