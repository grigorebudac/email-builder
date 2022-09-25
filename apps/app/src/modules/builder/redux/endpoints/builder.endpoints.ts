import { RootApi } from '@/redux/apis/root.api';

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
  }),
});

export const {
  useCreateTemplateMutation,
  useGetTemplatesQuery,
  useGetTemplateByIdQuery,
} = BuilderEndpoints;
