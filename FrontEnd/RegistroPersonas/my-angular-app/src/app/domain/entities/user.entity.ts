export interface User {
  id: number;
  username: string;
  email: string;
  role: 'Admin' | 'Albergue' | 'Visitante';
  albergueId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  role: 'Admin' | 'Albergue' | 'Visitante';
  albergueId?: number;
}