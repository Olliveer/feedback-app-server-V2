type SendMailData = {
  subject: string;
  body: string;
};

type MailAdapter = {
  sendMail: ({ body, subject }: SendMailData) => Promise<void>;
};

export { MailAdapter, SendMailData };
