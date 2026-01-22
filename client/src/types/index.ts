export interface User {
  id: string;
  username: string;
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
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}