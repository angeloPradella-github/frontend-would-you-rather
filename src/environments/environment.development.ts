export const environment = {
  production: false,
  siteName: 'BrainBeats',
  normalEndpoint: 'http://localhost:8084/GetQuestions?questionId=',
  aiEndpoint: 'http://localhost:8084/GetAIResponse?language=',
  isLoggedIn: false,
  userData: {
    id: 0,
    name: '',
    surname: '',
    email: '',
    encryptedPassword: '',
    nationality: '',
  },
};
