import dotenv from 'dotenv';
dotenv.config();

import { UserType } from '../types/entities/global.entities.type';
import { editPath } from '../utils/path';

export default class UserDto {
  id;
  email;
  username;
  avatar;
  role;
  created_at;
  updated_at;
  deleted_at;

  constructor(model: UserType) {
    this.id = model.id;
    this.email = model.email;
    this.role = model.role;
    this.avatar = model.avatar && editPath(model.avatar);
    this.username = model.username;
    this.created_at = model.created_at;
    this.updated_at = model.updated_at;
    this.deleted_at = model.deleted_at;
  }
}
