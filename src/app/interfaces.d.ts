export interface User {
  email: string;
  password: string;
}
export interface Project {
  $id: string;
  id: number;
  name: string;
  description: string;
  userId: string;
}
