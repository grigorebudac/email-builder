import { IEmailTemplate } from 'easy-email-editor';

export declare namespace Template {
  export interface Template {
    id: string;
    title: string;
    content: IEmailTemplate['content'];
    createdAt: string;
    updatedAt: string;
  }
  export interface CreateTemplate {
    title: string;
    subtitle: string;
  }
}
