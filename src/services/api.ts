/**
 * API service for communicating with the backend
 */

import axios from 'axios';
import { Message, BuddyVibe, GrowthUpdate, BuddyMessage } from '../types';

// This is the key change - pointing to your deployed backend
const API_URL = 'https://zentrafuge-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}) ;

/**
 * Sends a message to the AI buddy and receives a response
 */
export const sendMessage = async (
  message: string, 
  userId?: string, 
  buddyName?: string, 
  buddyVibe?: BuddyVibe,
  chatHistory?: Message[]
) => {
  try {
    const response = await api.post('/chat', {
      message,
      userId,
      buddyName,
      buddyVibe,
      chatHistory
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

/**
 * Gets a random daily reflection prompt
 */
export const getDailyPrompt = async () => {
  try {
    const response = await api.get('/prompt');
    return response.data.prompt;
  } catch (error) {
    console.error('Error getting daily prompt:', error);
    throw error;
  }
};

/**
 * Updates the growth level of a user's AI buddy
 */
export const updateGrowthLevel = async (userId: string, growthPoints: number = 1) => {
  try {
    const response = await api.post('/growth', { userId, growthPoints });
    return response.data as GrowthUpdate;
  } catch (error) {
    console.error('Error updating growth level:', error);
    throw error;
  }
};

/**
 * Sends an anonymous message to another user
 */
export const sendBuddyMessage = async (message: string, fromUserId: string) => {
  try {
    const response = await api.post('/buddy-message', { message, fromUserId });
    return response.data;
  } catch (error) {
    console.error('Error sending buddy message:', error);
    throw error;
  }
};

/**
 * Gets a random buddy message for a user
 */
export const getRandomBuddyMessage = async (userId: string) => {
  try {
    const response = await api.get(`/buddy-message/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting buddy message:', error);
    throw error;
  }
};
