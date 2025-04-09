/**
 * TypeScript type definitions for the ZENTRAFUGE application
 */

// User type definition
export interface User {
  uid: string;
  email: string;
  name: string;
  buddyName: string;
  buddyVibe: BuddyVibe;
  growthLevel: number;
  growthPoints: number;
  createdAt: Date;
}

// Message type for chat conversations
export interface Message {
  id?: string;
  sender: 'user' | 'buddy';
  text: string;
  timestamp: Date | any;
}

// Buddy personality vibes
export type BuddyVibe = 'calm' | 'energetic' | 'wise' | 'shy' | 'curious';

// Growth update response from API
export interface GrowthUpdate {
  growthLevel: number;
  growthPoints: number;
  levelUp: boolean;
}

// Buddy-to-buddy message
export interface BuddyMessage {
  id?: string;
  message: string;
  timestamp: Date | any;
}

// Chat response from API
export interface ChatResponse {
  success: boolean;
  reply: string;
  growthPoints: number;
  growthLevel: number;
  levelUp: boolean;
}
