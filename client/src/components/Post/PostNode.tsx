import React, { useState } from 'react';
import { Post } from '../../types';
import AddOperation from '../Operation/AddOperation';

interface PostNodeProps {
  post: Post;
  children: Post[];
  isAuthenticated: boolean;
  onOperationAdded: () => void;
}

const PostNode: React.FC<PostNodeProps> = ({
  post,
  children,
  isAuthenticated,
  onOperationAdded,
}) => {
  const [showAddOperation, setShowAddOperation] = useState(false);

  const getDisplayText = () => {
    if (post.parentId === null) {
      return `${post.username} started with: ${post.startNumber}`;
    }
    return `${post.username}: ${post.operation} ${post.operand}`;
  };

  return (
    <div style={{ marginLeft: post.parentId ? 30 : 0, marginBottom: 10 }}>
      <div
        style={{
          border: '1px solid #ccc',
          padding: 10,
          borderRadius: 5,
          backgroundColor: post.parentId === null ? '#e3f2fd' : '#fff',
        }}
      >
        <div style={{ fontWeight: 'bold' }}>{getDisplayText()}</div>

        <div style={{ fontSize: 22, margin: '5px 0' }}>
          Result: {post.result}
        </div>

        <div style={{ fontSize: 12, color: '#666' }}>
          {new Date(post.createdAt).toLocaleString()}
        </div>

        {isAuthenticated && (
          <>
            {!showAddOperation && (
              <button
                onClick={() => setShowAddOperation(true)}
                style={{ marginTop: 10 }}
              >
                Reply
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
          </>
        )}
      </div>

      {children.map(child => (
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
