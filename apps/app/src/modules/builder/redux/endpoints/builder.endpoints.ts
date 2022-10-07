import { RootApi } from '@/redux/apis/root.api';
import { IEmailTemplate } from 'easy-email-editor';

export const BuilderEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createTemplate: builder.mutation<unknown, unknown>({
      query: (body) => ({
        url: `/templates`,
        method: 'POST',
        body,
      }),
    }),
    getTemplates: builder.query<unknown, void>({
      query: () => {
        return '/templates';
      },
    }),
    getTemplateById: builder.query<unknown, string>({
      query: (templateId: string) => {
        return `/templates/${templateId}`;
      },
    }),
    updateTemplate: builder.mutation<
      unknown,
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
  useGetTemplateByIdQuery,
  useUpdateTemplateMutation,
} = BuilderEndpoints;
