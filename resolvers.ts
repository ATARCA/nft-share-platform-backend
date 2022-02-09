/* eslint-disable @typescript-eslint/no-explicit-any */
import { multiply } from './services/demoService';
import { MultiplyPayloadDemo } from './types';

export const resolvers = {
    Query: {
        allBooks: () => {
            const mockBooks =[
                { title: 'title1', author: 'author1' },
                { title: 'title2', author: 'author2' }
            ];
            return mockBooks;
        },
        multiply(_root: any, args: any) {
            const payload: MultiplyPayloadDemo = { value1: args.value1 as number, value2: args.value2 as number };
            const result = multiply(payload);
            return result;
        }
    }
};