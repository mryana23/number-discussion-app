import React, { useEffect, useState } from 'react';
import { Post, PostTreeNode } from '../../types';
import { postsAPI } from '../../services/api';
import PostNode from './PostNode';

interface PostTreeProps {
  isAuthenticated: boolean;
  refreshTrigger: number;
}

const PostTree: React.FC<PostTreeProps> = ({ isAuthenticated, refreshTrigger }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const data = await postsAPI.getAllPosts();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshTrigger]);

  // ✅ RECURSIVE TREE
  const buildTree = (parentId: string | null): PostTreeNode[] => {
    return posts
      .filter(p => p.parentId === parentId)
      .map(p => ({
        ...p,
        children: buildTree(p.id),
      }));
  };

  if (loading) return <div>Loading...</div>;

  const tree = buildTree(null);

  return (
    <div style={{ padding: 20 }}>
      <h2>Calculation Trees</h2>
      {tree.map(node => (
        <PostNode
          key={node.id}
          node={node}
          isAuthenticated={isAuthenticated}
          onOperationAdded={fetchPosts}
        />
      ))}
    </div>
  );
};

export default PostTree;
