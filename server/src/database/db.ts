// In-memory database
export interface User {
  id: string;
  username: string;
  password: string; // hashed
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  startNumber?: number;
  operation?: '+' | '-' | '*' | '/';
  operand?: number;
  parentId: string | null;
  result: number;
  createdAt: Date;
}

class Database {
  private users: User[] = [];
  private posts: Post[] = [];
  private userIdCounter = 1;
  private postIdCounter = 1;

  // User methods
  createUser(username: string, hashedPassword: string): User {
    const user: User = {
      id: `user_${this.userIdCounter++}`,
      username,
      password: hashedPassword,
    };
    this.users.push(user);
    return user;
  }

  findUserByUsername(username: string): User | undefined {
    return this.users.find(u => u.username === username);
  }

  findUserById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  // Post methods
  createPost(
    userId: string,
    username: string,
    startNumber: number | undefined,
    operation: '+' | '-' | '*' | '/' | undefined,
    operand: number | undefined,
    parentId: string | null
  ): Post | null {
    let result: number;

    if (parentId === null) {
      // Starting number
      if (startNumber === undefined) return null;
      result = startNumber;
    } else {
      // Operation on existing post
      const parent = this.posts.find(p => p.id === parentId);
      if (!parent || operation === undefined || operand === undefined) return null;

      switch (operation) {
        case '+':
          result = parent.result + operand;
          break;
        case '-':
          result = parent.result - operand;
          break;
        case '*':
          result = parent.result * operand;
          break;
        case '/':
          if (operand === 0) return null; // Prevent division by zero
          result = parent.result / operand;
          break;
        default:
          return null;
      }
    }

    const post: Post = {
      id: `post_${this.postIdCounter++}`,
      userId,
      username,
      startNumber: parentId === null ? startNumber : undefined,
      operation,
      operand,
      parentId,
      result,
      createdAt: new Date(),
    };

    this.posts.push(post);
    return post;
  }

  getAllPosts(): Post[] {
    return this.posts;
  }

  getPostById(id: string): Post | undefined {
    return this.posts.find(p => p.id === id);
  }
}

export const db = new Database();