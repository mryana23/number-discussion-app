import React, { useEffect, useState } from 'react';
import { Post } from '../../types';
import { postsAPI } from '../../services/api';
import PostNode from './PostNode';

interface PostTreeProps {
  isAuthenticated: boolean;
  refreshTrigger: number;
}

const PostTree: React.FC<PostTreeProps> = ({ isAuthenticated, refreshTrigger }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      const data = await postsAPI.getAllPosts();
      setPosts(data);
      setError('');
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshTrigger]);

  const buildTree = () => {
    const rootPosts = posts.filter(p => p.parentId === null);
    
    const getChildren = (parentId: string): Post[] => {
      return posts.filter(p => p.parentId === parentId);
    };

    return rootPosts.map(root => ({
      post: root,
      children: getChildren(root.id)
    }));
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading posts...</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;
  }

  const tree = buildTree();

  if (tree.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
        No posts yet. {isAuthenticated && 'Start a new calculation chain!'}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Calculation Trees</h2>
      {tree.map(({ post, children }) => (
        <PostNode
          key={post.id}
          post={post}
          children={children}
          isAuthenticated={isAuthenticated}
          onOperationAdded={fetchPosts}
        />
      ))}
    </div>
  );
};

export default PostTree;