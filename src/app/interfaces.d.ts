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

export interface Task {
  $id: string;
  id: number;
  title: string;
  description: string;
  status: string;
  summary: string;
  priority: string;
  type: string;
  color: string;
  projectId: number;
}
