import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ChatRequest, nanoid } from 'ai'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError = (error: unknown) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}

export const generateErrorResponse = (chatMessages: any[], errorMessage: string): ChatRequest => {
  return {
      messages: [...chatMessages, {
          id: nanoid(),
          name: 'Error',
          role: 'system',
          content: errorMessage
      }],
  };
};

export const generateSuccessResponse = (chatMessages: any[], successmessage: string): ChatRequest => {
  return {
      messages: [...chatMessages, {
          id: nanoid(),
          name: 'Success',
          role: 'system',
          content: successmessage
      }],
  };
};