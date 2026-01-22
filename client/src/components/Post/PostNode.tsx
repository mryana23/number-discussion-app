import React, { useState } from 'react';
import { PostTreeNode } from '../../types';
import AddOperation from '../Operation/AddOperation';

interface PostNodeProps {
  node: PostTreeNode;
  isAuthenticated: boolean;
  onOperationAdded: () => void;
}

const PostNode: React.FC<PostNodeProps> = ({
  node,
  isAuthenticated,
  onOperationAdded,
}) => {
  const [showAddOperation, setShowAddOperation] = useState(false);
  const isRoot = node.parentId === null;

  return (
    <div style={{ marginLeft: isRoot ? 0 : 30, marginTop: 16 }}>
      <div
        style={{
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 10,
          padding: 14,
          boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: 6 }}>
          <strong>{node.username}</strong>{' '}
          {isRoot ? (
            <span style={{ color: '#6b7280' }}>
              started with: <strong>{node.startNumber}</strong>
            </span>
          ) : (
            <span
              style={{
                background: '#eef2ff',
                color: '#4338ca',
                padding: '2px 8px',
                borderRadius: 6,
                fontSize: 13,
                marginLeft: 6,
              }}
            >
              {node.operation} {node.operand}
            </span>
          )}
        </div>

        {/* RESULT */}
        <div style={{ fontSize: 15, marginBottom: 4 }}>
          Result:{' '}
          <strong style={{ color: '#16a34a' }}>{node.result}</strong>
        </div>

        {/* TIME */}
        <div style={{ fontSize: 12, color: '#9ca3af' }}>
          {new Date(node.createdAt).toLocaleString()}
        </div>

        {/* ACTION */}
        {isAuthenticated && (
          <button
            onClick={() => setShowAddOperation(!showAddOperation)}
            style={{
              marginTop: 10,
              padding: '6px 10px',
              borderRadius: 6,
              border: 'none',
              background: '#2563eb',
              color: '#fff',
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            {showAddOperation ? 'Cancel' : 'Add Operation'}
          </button>
        )}

        {/* ADD OPERATION FORM */}
        {showAddOperation && (
          <div style={{ marginTop: 10 }}>
            <AddOperation
                parentId={node.id}
                onSuccess={() => {
                    setShowAddOperation(false);
                    onOperationAdded();
                }}
                onCancel={() => setShowAddOperation(false)}
                />

          </div>
        )}
      </div>

      {/* CHILDREN */}
      {node.children?.map(child => (
        <PostNode
          key={child.id}
          node={child}
          isAuthenticated={isAuthenticated}
          onOperationAdded={onOperationAdded}
        />
      ))}
    </div>
  );
};

export default PostNode;
