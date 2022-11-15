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
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          TemplateEndpoints.util.updateQueryData(
            'getTemplates',
            undefined,
            (draft) => {
              const date = Date.now().toString();

              const newTemplate: Template.Template = {
                id: date,
                title: body.title,
                subtitle: body.subtitle,
                content: {} as Template.Template['content'],
                createdAt: date,
                updatedAt: date,
              };

              draft.push(newTemplate);
            }
          )
        );

        try {
          await queryFulfilled;
        } finally {
          patchResult.undo();
        }
      },
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
    uploadTemplateImage: builder.mutation<
      Template.UploadImageResponse,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/templates/${id}/upload-image`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteTemplateById: builder.mutation<unknown, string>({
      query: (templateId: string) => {
        return {
          url: `/templates/${templateId}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted(templateId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          TemplateEndpoints.util.updateQueryData(
            'getTemplates',
            undefined,
            (draft) => {
              const index = draft.findIndex(
                (template) => template.id === templateId
              );

              if (index > -1) {
                draft.splice(index, 1);
              }
            }
          )
        );

        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

export const {
  useCreateTemplateMutation,
  useGetTemplatesQuery,
  useLazyGetTemplateByIdQuery,
  useUpdateTemplateMutation,
  useDeleteTemplateByIdMutation,
  useUploadTemplateImageMutation,
} = TemplateEndpoints;
