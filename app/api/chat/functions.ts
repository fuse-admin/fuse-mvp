import type { ChatCompletionCreateParams } from 'openai/resources/chat/index'
import { checkClientInList } from '../firm-clients/clients';

export const functions: ChatCompletionCreateParams.Function[] = [
    {
      name: 'fill-W-9',
      description: 'Fill out a W-9 form for a client',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the client, e.g. John Smith',
          },
        },
        required: ['name'],
      },
      
    },
    {
      name: 'fill-subscription-documents',
      description: 'Fill out subscription documents for a client',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the client, e.g. John Smith',
          },
          fund: {
            type: 'string',
            description: 'The name of the fund, e.g. Ironwood',
          },
        },
        required: ['name', 'fund']
      },
      
    },
  ];
