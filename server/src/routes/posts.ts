import express from 'express';
import { db } from '../database/db';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all posts (public)
router.get('/', (req, res) => {
  try {
    const posts = db.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create starting number (authenticated)
router.post('/start', authMiddleware, (req: AuthRequest, res) => {
  try {
    const { startNumber } = req.body;
    
    if (typeof startNumber !== 'number') {
      return res.status(400).json({ error: 'Start number must be a valid number' });
    }

    const post = db.createPost(
      req.user!.id,
      req.user!.username,
      startNumber,
      undefined,
      undefined,
      null
    );

    if (!post) {
      return res.status(400).json({ error: 'Failed to create post' });
    }

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add operation (authenticated)
router.post('/operation', authMiddleware, (req: AuthRequest, res) => {
  try {
    const { parentId, operation, operand } = req.body;

    if (!parentId) {
      return res.status(400).json({ error: 'Parent ID is required' });
    }

    if (!operation || !['+', '-', '*', '/'].includes(operation)) {
      return res.status(400).json({ error: 'Valid operation (+, -, *, /) is required' });
    }

    if (typeof operand !== 'number') {
      return res.status(400).json({ error: 'Operand must be a valid number' });
    }

    const parent = db.getPostById(parentId);
    if (!parent) {
      return res.status(404).json({ error: 'Parent post not found' });
    }

    const post = db.createPost(
      req.user!.id,
      req.user!.username,
      undefined,
      operation,
      operand,
      parentId
    );

    if (!post) {
      return res.status(400).json({ error: 'Failed to create operation' });
    }

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;