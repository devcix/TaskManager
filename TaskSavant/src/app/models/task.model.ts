export interface Task {
    id: number;
    name: string;
    dueDate?: string;
    assignedTo: string;
    completed: boolean;
    description: string;
}