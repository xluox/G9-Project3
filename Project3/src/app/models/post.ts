import {User} from './user'

export interface Post {
    _id: string;
    content: string;
    title: string;
    author: User;
  }