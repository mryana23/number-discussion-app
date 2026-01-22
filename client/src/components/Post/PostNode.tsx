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
          <strong style={{ color: '#16a34a' }}>
            {node.result}
          </strong>
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
