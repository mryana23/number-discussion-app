import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8080;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Health check FIRST (before other routes that might fail)
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    port: PORT,
    timestamp: new Date().toISOString() 
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Number Discussion API', 
    status: 'running',
    port: PORT,
    endpoints: {
      health: '/health',
      auth: '/api/auth/*',
      posts: '/api/posts/*'
    }
  });
});

// Import routes with error handling
try {
  const authRoutes = require('./routes/auth').default;
  const postsRoutes = require('./routes/posts').default;
  
  app.use('/api/auth', authRoutes);
  app.use('/api/posts', postsRoutes);
  console.log('✅ Routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading routes:', error);
  // Don't exit - still serve health check
}

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Health check: http://0.0.0.0:${PORT}/health`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;