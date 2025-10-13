import { Observable } from 'rxjs';
import { User, CreateUserRequest, UpdateUserRequest } from '../entities';

export interface UserRepository {
  getAll(): Observable<User[]>;
  getById(id: number): Observable<User>;
  create(user: CreateUserRequest): Observable<User>;
  update(user: UpdateUserRequest): Observable<User>;
  delete(id: number): Observable<void>;
}