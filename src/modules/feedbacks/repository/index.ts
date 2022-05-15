export type FeedbackCreateData = {
  type: string;
  comment: string;
  screenshot?: string;
};

export type FeedbackRepository = {
  create: (data: FeedbackCreateData) => Promise<void>;
};
