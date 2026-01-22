import React, { useEffect, useState } from 'react';
import { Post, PostTreeNode } from '../../types';
import { postsAPI } from '../../services/api';
import PostNode from './PostNode';

interface PostTreeProps {
  isAuthenticated: boolean;
  refreshTrigger: number;
}

const PostTree: React.FC<PostTreeProps> = ({
  isAuthenticated,
  refreshTrigger,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await postsAPI.getAllPosts();
      setPosts(data);
      setError('');
    } catch {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshTrigger]);

  const buildTree = (): PostTreeNode[] => {
    const map = new Map<string, PostTreeNode>();

    posts.forEach((p) => {
      map.set(p.id, { ...p, children: [] });
    });

    const roots: PostTreeNode[] = [];

    map.forEach((post) => {
      if (post.parentId) {
        map.get(post.parentId)?.children.push(post);
      } else {
        roots.push(post);
      }
    });

    return roots;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Calculation Trees</h2>
      {buildTree().map((root) => (
        <PostNode
          key={root.id}
          post={root}
          children={root.children}
          isAuthenticated={isAuthenticated}
          onOperationAdded={fetchPosts}
        />
      ))}
    </div>
  );
};

export default PostTree;
