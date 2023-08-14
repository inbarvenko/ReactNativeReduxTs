export type ToDoType = {
  id: number;
  title: string;
  completed: boolean;
  created_at?: string;
};

export enum FilterEnum {
  all = 'all',
  active = 'active',
  completed = 'completed',
}
