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
  const [showAdd, setShowAdd] = useState(false);

  const isRoot = node.parentId === null;

  return (
    <div style={{ marginLeft: isRoot ? 0 : 30, position: 'relative' }}>
      {/* vertical line */}
      {!isRoot && (
        <div
          style={{
            position: 'absolute',
            left: -15,
            top: 0,
            bottom: 0,
            width: 2,
            backgroundColor: '#e0e0e0',
          }}
        />
      )}

      <div
        style={{
          background: isRoot ? '#e3f2fd' : '#ffffff',
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: 12,
          marginTop: 12,
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: 4 }}>
          {node.username}
        </div>

        <div style={{ fontSize: 14, marginBottom: 6 }}>
          {isRoot
            ? `Started with ${node.startNumber}`
            : `${node.operation} ${node.operand}`}
        </div>

        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: '#1976d2',
            marginBottom: 6,
          }}
        >
          {node.result}
        </div>

        <div style={{ fontSize: 11, color: '#777' }}>
          {new Date(node.createdAt).toLocaleString()}
        </div>

        {isAuthenticated && !showAdd && (
          <button
            onClick={() => setShowAdd(true)}
            style={{
              marginTop: 8,
              padding: '4px 10px',
              fontSize: 12,
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Reply
          </button>
        )}

        {showAdd && (
          <AddOperation
            parentId={node.id}
            onSuccess={() => {
              setShowAdd(false);
              onOperationAdded();
            }}
            onCancel={() => setShowAdd(false)}
          />
        )}
      </div>

      {/* children */}
      {node.children.map(child => (
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
