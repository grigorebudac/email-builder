import mjml from 'mjml-browser';
import { JsonToMjml } from 'easy-email-core';
import { Template } from '@/types/template.types';
import { IEmailTemplate } from 'easy-email-editor';

export function jsonToHtml(
  data: IEmailTemplate['content'],
  mergeTags: Template.MergeTags
) {
  return mjml(
    JsonToMjml({
      data: data,
      mode: 'production',
      context: data,
      dataSource: mergeTags,
    }),
    {
      validationLevel: 'soft',
    }
  ).html;
}
