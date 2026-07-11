import { Emotion, EmotionResponse } from '../types/types';

/**
 * Service to simulate a FastAPI endpoint: POST /api/predict-emotion
 * 
 * In a real-world scenario, this would send a multipart/form-data POST request
 * to a FastAPI backend running a PyTorch/TensorFlow emotion-detection model.
 */
export const emotionService = {
  predictEmotion: async (imageFileOrBase64?: File | string): Promise<EmotionResponse> => {
    // Mimic network latency of 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const emotions: Emotion[] = ['Happy', 'Sad', 'Angry', 'Neutral', 'Stressed', 'Tired'];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];

    let confidence = 85 + Math.floor(Math.random() * 14); // 85% to 98%
    let recommendationId = '';

    switch (randomEmotion) {
      case 'Happy':
        recommendationId = 'happy-hiit-blast';
        break;
      case 'Sad':
        recommendationId = 'sad-healing-yoga';
        break;
      case 'Angry':
        recommendationId = 'angry-boxer-fury';
        break;
      case 'Neutral':
        recommendationId = 'neutral-upper-sculpt';
        break;
      case 'Stressed':
        recommendationId = 'stressed-decompress-stretch';
        break;
      case 'Tired':
        recommendationId = 'tired-joint-mobilization';
        break;
    }

    const response: EmotionResponse = {
      emotion: randomEmotion,
      confidence,
      timestamp: new Date().toISOString(),
      recommendationId,
    };

    // Store in LocalStorage for persistence across page sessions
    try {
      const historyJson = localStorage.getItem('emotion_history');
      const history = historyJson ? JSON.parse(historyJson) : [];
      history.unshift(response);
      localStorage.setItem('emotion_history', JSON.stringify(history.slice(0, 50))); // Keep last 50 scans
    } catch (e) {
      console.error('Error saving emotion history to LocalStorage:', e);
    }

    return response;
  },

  getHistory: (): EmotionResponse[] => {
    try {
      const historyJson = localStorage.getItem('emotion_history');
      return historyJson ? JSON.parse(historyJson) : [];
    } catch {
      return [];
    }
  },

  clearHistory: () => {
    localStorage.removeItem('emotion_history');
  }
};
