import React, { useState } from 'react';
import { PostTreeNode } from '../../types';
import AddOperation from '../Operation/AddOperation';

interface PostNodeProps {
  post: PostTreeNode;
  children: PostTreeNode[];
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

  return (
    <div style={{ marginLeft: post.parentId ? 30 : 0 }}>
      <div>
        <b>{post.username}</b> → Result: {post.result}
      </div>

      {children.map((child) => (
        <PostNode
          key={child.id}
          post={child}
          children={child.children}
          isAuthenticated={isAuthenticated}
          onOperationAdded={onOperationAdded}
        />
      ))}
    </div>
  );
};

export default PostNode;
