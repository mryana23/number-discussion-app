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
  const { children } = node;
  const [showAdd, setShowAdd] = useState(false);

  const text =
    node.parentId === null
      ? `${node.username} started with ${node.startNumber}`
      : `${node.username}: ${node.operation} ${node.operand}`;

  return (
    <div style={{ marginLeft: node.parentId ? 30 : 0, marginTop: 10 }}>
      <div style={{ border: '1px solid #ccc', padding: 10 }}>
        <strong>{text}</strong>
        <div>Result: {node.result}</div>

        {isAuthenticated && !showAdd && (
          <button onClick={() => setShowAdd(true)}>Reply</button>
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

      {/* ✅ RECURSIVE RENDER */}
      {children.map(child => (
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
