// src/lib/stores/user.ts
import { readable, type Readable, writable, type Writable } from 'svelte/store';

// User type definition
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: 'Admin' | 'User' | 'Editor' | 'Viewer';
  status: 'Online' | 'Offline' | 'Away';
}

// Fake user data
const fakeUser: User = {
  id: '1',
  name: 'Mike',
  email: 'michaelmaherkamel@gmail.com',
  avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKz0_ODljfy4jpO4TyAKtbNGm4a1JhnrgVoQ4o3O17-5qgz93xL=s288-c-no',
  role: 'Admin',
  status: 'Online'
};

// Create a readable store with the fake user
export const user: Readable<User> = readable(fakeUser);

// For a real app, you would implement proper authentication
// This would be a writable store with login/logout methods

// Authentication credentials type
// export interface AuthCredentials {
//   email: string;
//   password: string;
// }

// export const user: Writable<User | null> = writable(null);

// export async function login(credentials: AuthCredentials): Promise<void> {
//   try {
//     // Call API, set user data on success
//     const response = await fetch('/api/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(credentials)
//     });
//     
//     if (!response.ok) {
//       throw new Error('Authentication failed');
//     }
//     
//     const userData: User = await response.json();
//     user.set(userData);
//   } catch (error) {
//     console.error('Login error:', error);
//     throw error;
//   }
// }

// export async function logout(): Promise<void> {
//   try {
//     // Clear user data
//     user.set(null);
//     // Call API to invalidate session
//     await fetch('/api/auth/logout', { method: 'POST' });
//   } catch (error) {
//     console.error('Logout error:', error);
//   }
// }

// Helper function to check if user is authenticated
// export function isAuthenticated(): Readable<boolean> {
//   return derived(user, $user => $user !== null);
// }