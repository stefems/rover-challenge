import {describe, expect, test} from '@jest/globals';
import { Main } from './src/main';
import { Sitter } from './src/sitter';


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
describe('CSV Parsing Tests', () => {
    test('Empty CSV File.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_empty.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('CSV Error: CSV Headings cannot be empty.');
            }
        });
    });
    test('Possible duplicate review found.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_duplicates.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('CSV Error: possible duplicate review record found.');
            }
        });
    });
    test('CSV contains corrupted or non-parseable data.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_corrupted.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('CSV Error: other CSV error occurred.');
            }
        });
    });
    test('CSV contains row with incorrect number of columns.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_bad_columns.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('CSV Error: All rows must have the same number of columns as there are headings.');
            }
        });
    });
    test('CSV contains row with non-integer data in the rating column.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_bad_rating.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('Rating Error: rating created with non-integer data in the rating column.');
            }
        });
    });
    test('CSV contains row with non-number data in the rating column.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_bad_rating2.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('Rating Error: rating created with non-number data in the rating column.');
            }
        });
    });
    test('CSV contains row with rating less than 0 or greater than 5.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_bad_rating3.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('Rating Error: rating created with value less than 0 or greater than 5.');
            }
        });
    });
    test('CSV contains row with invalid url for the sitter image column.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_bad_sitter_image.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('CSV Error: CSV contains row with invalid url for the sitter image column.');
            }
        });
    });
    test('CSV contains row with invalid date in the start date column.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_bad_start_date.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('CSV Error: CSV contains row with invalid date in the start date column.');
            }
        });
    });
    test('CSV contains row with invalid date in the end date column.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_bad_end_date.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('CSV Error: CSV contains row with invalid date in the end date column');
            }
        });
    });
    test('CSV contains row with invalid url for the owner image column.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_bad_owner_image.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('CSV Error: CSV contains row with invalid url for the owner image column.');
            }
        });
    });
    test('CSV contains row with invalid phone number in the sitter phone number column.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_bad_sitter_number.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('CSV Error: CSV contains row with invalid phone number in the sitter phone number column.');
            }
        });
    });
    test('CSV contains row with invalid phone number in the owner phone number column.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_bad_owner_number.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('CSV Error: CSV contains row with invalid phone number in the owner phone number column.');
            }
        });
    });
    test('CSV contains row with incorrectly formatted email in the sitter email column.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_bad_sitter_email.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('CSV Error: CSV contains row with incorrectly formatted email in the sitter email column.');
            }
        });
    });
    test('CSV contains row with incorrectly formatted email in the owner email column.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_bad_owner_email.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('CSV Error: CSV contains row with incorrectly formatted email in the owner email column.');
            }
        });
    });
    test('CSV contains row with invalid integer for the response time minutes.', () => {
        expect(async () => {
            const main = new Main('./test_csvs/reviews_bad_response_time.csv', ',');
            try {
                await main.loadDataFromCSV();
            } catch (error) {
                expect(error).toMatch('CSV Error: CSV contains row with invalid number in the response time minutes column.');
            }
        });
    });
});
describe('Sitter Class Tests', () => {
    test('Sitter with empty name throws error.', () => {
        expect(() => {
            new Sitter('user4739@gmail.com', '');
        }).toThrow('Sitter Error: cannot initialize sitter with empty name.');
    });
    test('Sitter with empty email throws error.', () => {
        expect(() => {
            new Sitter('', 'Leilani R.');
        }).toThrow('Sitter Error: cannot initialize sitter with empty or invalid email.');
    });
    test('Sitter with invalid email throws error.', () => {
        expect(() => {
            new Sitter('notanemail', 'Leilani R.');
        }).toThrow('Sitter Error: cannot initialize sitter with empty or invalid email.');
    });
    test('Sitter assigned correct profile score.', () => {
        const newSitter = new Sitter('user4739@gmail.com', 'Leilani R.');
        const profileScore = newSitter.getProfileScore(true);
        expect(profileScore).toBe((5 * 6/26).toFixed(2));
    });
    test('Sitter with no ratings has search score equal to profile score.', () => {
        const newSitter = new Sitter('user4739@gmail.com', 'Leilani R.');
        const searchScore = newSitter.getSearchScoreFixed();
        expect(searchScore).toBe((5 * 6/26).toFixed(2));
    });
    test('Sitter with 10 5-star ratings has search score equal to 5.', () => {
        const newSitter = new Sitter('user4739@gmail.com', 'Leilani R.');
        for(let i = 0; i < 10; i++) newSitter.updateRatings(5)
        const searchScore = newSitter.getSearchScoreFixed();
        expect(searchScore).toBe('5.00');
    });
    test('Sitter with profile score of 2.5 and 5 5-star ratings has search score equal to 3.75.', () => {
        const newSitter = new Sitter('user4739@gmail.com', 'abcdefghijklm');
        for(let i = 0; i < 5; i++) newSitter.updateRatings(5)
        const searchScore = newSitter.getSearchScoreFixed();
        expect(searchScore).toBe('3.75');
    });
    test('Sitter with profile score of 2.5 and 1 5-star ratings has search score equal to 2.75.', () => {
        const newSitter = new Sitter('user4739@gmail.com', 'abcdefghijklm');
        newSitter.updateRatings(5)
        const searchScore = newSitter.getSearchScoreFixed();
        expect(searchScore).toBe('2.75');
    });
    test('Sitter with 5 ratings has rating score of average.', () => {
        const newSitter = new Sitter('user4739@gmail.com', 'abcdefghijklm');
        for(let i = 0; i < 5; i++) newSitter.updateRatings(i+1)
        const ratingsScore = newSitter.getRatingsScore(true);
        expect(ratingsScore).toBe('3.00');
    });
});

/*
Todo: Other CSV Tests:
- missing read/write permissions error on load reviews.csv or on sitters.csv (when already existing)
- incorrect file type, not csv
- error when reading corrupted file
*/
