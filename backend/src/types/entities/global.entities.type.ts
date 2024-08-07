export type CommentAttachmentType = {
  id: number;
  type: string;
  comment_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export type TaskAttachmentType = {
  id: number;
  type: string;
  task_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export type IUser = {
  id: number;
  email: string;
  name: string | null;
  role: string;
  password?: string;
  avatar: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export type TaskType = {
  id: number;
  title: string;
  description: string;
  due_date: Date;
  user_id: number;
  assigned_to: number | null;
  project_id: number;
  is_completed: boolean;
  members: Array<IUser>;
  attachments: Array<TaskAttachmentType>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export type TaskFromDBType = {
  members: Array<IUser>;
  attachments: Array<TaskAttachmentType>;
  dataValues: object;
};

export type CommentType = {
  id: number;
  content: string;
  user_id: number;
  task_id: number;
  attachments: Array<CommentAttachmentType>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};

export type CommentFromDBType = {
  attachments: Array<CommentAttachmentType>;
  dataValues: object;
};

export type UserSessionType = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
};
