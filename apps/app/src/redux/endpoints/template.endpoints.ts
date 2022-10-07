import { RootApi } from '@/redux/apis/root.api';
import { Template } from '@/types/template.types';
import { IEmailTemplate } from 'easy-email-editor';

export const TemplateEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createTemplate: builder.mutation<
      Template.Template,
      Template.CreateTemplate
    >({
      query: (body) => ({
        url: `/templates`,
        method: 'POST',
        body: {
          title: body.title,
          subtitle: body.subtitle,
        },
      }),
    }),
    getTemplates: builder.query<Template.Template[], void>({
      query: () => {
        return '/templates';
      },
    }),
    getTemplateById: builder.query<Template.Template, string>({
      query: (templateId: string) => {
        return `/templates/${templateId}`;
      },
    }),
    updateTemplate: builder.mutation<
      Template.Template,
      { id: string; content: IEmailTemplate['content'] }
    >({
      query: ({ id, content }) => ({
        url: `/templates/${id}`,
        method: 'PATCH',
        body: {
          content,
        },
      }),
    }),
  }),
});

export const {
  useCreateTemplateMutation,
  useGetTemplatesQuery,
  useLazyGetTemplateByIdQuery,
  useUpdateTemplateMutation,
} = TemplateEndpoints;
