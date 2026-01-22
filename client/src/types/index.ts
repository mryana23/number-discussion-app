export interface User {
  id: string;
  username: string;
}

export interface Post {
  id: string;
  parentId: string | null;
  username: string;
  startNumber?: number;
  operation?: '+' | '-' | '*' | '/';
  operand?: number;
  result: number;
  createdAt: string;
}

export interface PostTreeNode extends Post {
  children: PostTreeNode[];
}

export interface AuthResponse {
  token: string;
  user: User;
}