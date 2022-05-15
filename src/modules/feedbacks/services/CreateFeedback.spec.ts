import { CreateFeedbackService } from './CreateFeedbackService';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const createFeedbackService = new CreateFeedbackService(
  {
    create: createFeedbackSpy,
  },
  { sendMail: sendMailSpy },
);

describe('createFeedback', () => {
  it('should create feedback', async () => {
    await expect(
      createFeedbackService.handle({
        comment: 'test',
        type: 'BUG',
        screenshot: 'data:image/png;base64,hduihsdiuah',
      }),
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(
      createFeedbackService.handle({
        comment: 'test',
        type: '',
        screenshot: 'data:image/png;base64,hduihsdiuah',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      createFeedbackService.handle({
        comment: '',
        type: 'BUG',
        screenshot: 'data:image/png;base64,hduihsdiuah',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(
      createFeedbackService.handle({
        comment: 'test',
        type: 'BUG',
        screenshot: 'screenshot.png',
      }),
    ).rejects.toThrow();
  });
});
