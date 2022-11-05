export declare namespace Email {
  export interface SendEmail {
    toAddress: string;
    subject: string;
    body: {
      html: string;
      text: string;
    };
  }
  export interface SendEmailResponse {
    messageId: string;
  }
}
