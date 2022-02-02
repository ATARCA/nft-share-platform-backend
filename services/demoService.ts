import { MultiplyPayloadDemo } from '../types';

export const multiply = (data: MultiplyPayloadDemo): number => {
    return data.value1 * data.value2;
};
