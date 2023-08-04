export type ToDoType = {
  id: number;
  title: string;
  completed: boolean;
};

export enum FilterEnum {
  all = 'all',
  active = 'active',
  completed = 'completed',
}
