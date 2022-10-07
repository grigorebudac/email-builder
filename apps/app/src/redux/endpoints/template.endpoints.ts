import { RootApi, TEMPLATE_TAG } from '@/redux/apis/root.api';
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
      invalidatesTags: [TEMPLATE_TAG],
    }),
    getTemplates: builder.query<Template.Template[], void>({
      query: () => {
        return '/templates';
      },
      providesTags: (res) => {
        return (res ?? []).map((template) => ({
          type: TEMPLATE_TAG,
          id: template.id,
        }));
      },
    }),
    getTemplateById: builder.query<Template.Template, string>({
      query: (templateId: string) => {
        return `/templates/${templateId}`;
      },
      providesTags: (template) => {
        return [
          {
            type: TEMPLATE_TAG,
            id: template?.id,
          },
        ];
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
      invalidatesTags: [TEMPLATE_TAG],
    }),
  }),
});

export const {
  useCreateTemplateMutation,
  useGetTemplatesQuery,
  useLazyGetTemplateByIdQuery,
  useUpdateTemplateMutation,
} = TemplateEndpoints;
