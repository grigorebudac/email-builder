import { IEmailTemplate } from 'easy-email-editor';

export declare namespace Template {
  export interface Template {
    id: string;
    title: string;
    subtitle: string;
    content: IEmailTemplate['content'];
    html: string;
    previewImage?: string;
    createdAt: string;
    updatedAt: string;
  }
  export type CreateTemplate = {
    title: Template['title'];
    subtitle: Template['subtitle'];
  } & Partial<Omit<Template, 'title' | 'subtitle'>>;
  export interface MergeTags {
    [key: string]: string | MergeTags;
  }

  export interface UploadImageResponse {
    location: string;
  }

  export interface TemplatePreviewImageResponse {
    count: number;
  }
}
