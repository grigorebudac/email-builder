import { RootApi, EMAIL_TAG } from '@/redux/apis/root.api';
import { Email } from '@/types/email.types';

export const EmailEndpoints = RootApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    sendEmail: builder.mutation<Email.SendEmailResponse, Email.SendEmail>({
      query: (body) => ({
        url: `/emails/send`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [EMAIL_TAG],
    }),
  }),
});

export const { useSendEmailMutation } = EmailEndpoints;
