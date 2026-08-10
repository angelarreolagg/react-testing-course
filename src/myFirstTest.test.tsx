import { describe, it, expect} from 'vitest';

describe('My First Test', () => {
    it('two numbers should add correctly', () => {
        const add = (a: number, b: number) => a + b;
        const result = add(2, 3);
        expect(result).toBe(5);
    });

    it('two text should be the same', () => {
        const text1 = 'Angel Here';
        const text2 = 'Angel';
        expect(text1).toBe(text2);
    })
});