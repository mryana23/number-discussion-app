import React, { useState } from 'react';
import { Post } from '../../types';
import AddOperation from '../Operation/AddOperation';

interface PostNodeProps {
  post: Post;
  children: Post[];
  isAuthenticated: boolean;
  onOperationAdded: () => void;
}

const PostNode: React.FC<PostNodeProps> = ({ post, children, isAuthenticated, onOperationAdded }) => {
  const [showAddOperation, setShowAddOperation] = useState(false);

  const getDisplayText = () => {
    if (post.parentId === null) {
      return `${post.username} started with: ${post.startNumber}`;
    } else {
      return `${post.username}: ${post.operation} ${post.operand}`;
    }
  };

  return (
    <div style={{ marginLeft: post.parentId ? '30px' : '0', marginBottom: '10px' }}>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: post.parentId === null ? '#e3f2fd' : '#fff',
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
          {getDisplayText()}
        </div>
        <div style={{ fontSize: '24px', color: '#333', marginBottom: '5px' }}>
          Result: {post.result}
        </div>
        <div style={{ fontSize: '12px', color: '#666' }}>
          {new Date(post.createdAt).toLocaleString()}
        </div>
        {isAuthenticated && !showAddOperation && (
          <button
            onClick={() => setShowAddOperation(true)}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Add Operation
          </button>
        )}
        {showAddOperation && (
          <AddOperation
            parentId={post.id}
            onSuccess={() => {
              setShowAddOperation(false);
              onOperationAdded();
            }}
            onCancel={() => setShowAddOperation(false)}
          />
        )}
      </div>
      {children.map((child) => (
        <PostNode
          key={child.id}
          post={child}
          children={[]}
          isAuthenticated={isAuthenticated}
          onOperationAdded={onOperationAdded}
        />
      ))}
    </div>
  );
};

export default PostNode;