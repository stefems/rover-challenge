import {describe, expect, test} from '@jest/globals';
import { Main } from './main';

describe('CSV Filename/Delimiter Tests', () => {
    test('Empty filename throws error.', () => {
        expect(() => {
            new Main('', ',');
        }).toThrow('Filename and delimiter cannot be empty.');
    });
    test('Empty delimiter throws error.', () => {
        expect(() => {
            new Main('./reviews.csv', '');
        }).toThrow('Filename and delimiter cannot be empty.');
    });
    test('File not found error thrown.', () => {
        expect(async () => {
            const main = new Main('./not_a_file.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('CSV Error: file does not exist.');
            }
        });
    });
});

//csv heading

//csv rows

//computations
