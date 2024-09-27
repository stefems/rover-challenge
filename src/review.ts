import { Rating } from './rating';
import utils from './utils';

/*
Note for reviewers: as you read through this file you'll see that the error messages refer
    to csv parsing errors. In the future, if the Review class was going to be used in contexts
    separate from CSV parsing, I would refactor this class to throw error messages worded
    differently and only referring to invalid arguments, as well as generally decoupling the
    csv parsing from the review class as much as possible.

    As for modeling the data for easily pushing to a rdb: I would likely add char counts to
    ensure string types can be used for the correct-length db text types, would set the 
    number types to small int db number types, and would ensure the date is translated
    correctly into the date db type.
*/

export class Review {
    private rating: number;
    private sitterImage: string;
    private endDate: string;
    private text: string;
    private ownerImage: string;
    private dogs: Array<string>;
    private sitter: string;
    private owner: string;
    private startDate: string;
    private sitterPhoneNumber: string;
    private sitterEmail: string;
    private ownerPhoneNumber: string;
    private ownerEmail: string;
    private responseTimeMinutes: number;

    public constructor(values: Array<string>, delimiter: string, columnCount: number) {
        if (values.length !== columnCount) {
            throw new Error('CSV Error: All rows must have the same number of columns as there are headings.')
        }
        const setters = [
            this.setRating.bind(this), this.setSitterImage.bind(this), this.setEndDate.bind(this), this.setText.bind(this),
            this.setOwnerImage.bind(this), this.setDogs.bind(this), this.setSitter.bind(this), this.setOwner.bind(this),
            this.setStartDate.bind(this), this.setSitterPhoneNumber.bind(this), this.setSitterEmail.bind(this),
            this.setOwnerPhoneNumber.bind(this), this.setOwnerEmail, this.setResponseTimeMinutes.bind(this)
        ]; //if the setter functions are not bound to the context the class members will not be set
        values.forEach((value, index) => setters[index](value));
    }
    public getSitterEmail(): string {
        return this.sitterEmail;
    }
    public getSitterName(): string {
        return this.sitter;
    }
    public getRating(): number {
        return this.rating;
    }
    public static isPossibleDuplicate(reviewA: Review, reviewB: Review): boolean {
        let isDuplicate = false;
        /* checking certain fields to see if the review is from the same owner
            and sitter and if it is on the same dates. A more precise date comparison
            could be possible.
        */
        if (
            reviewA.sitterEmail === reviewB.sitterEmail &&
            reviewA.ownerEmail === reviewB.ownerEmail &&
            reviewA.startDate === reviewB.startDate &&
            reviewA.endDate === reviewB.endDate
        ) {
            isDuplicate = true;
        }
        return isDuplicate;
    }
    private setRating(value: string): void {
        const newRating = new Rating(value);
        this.rating = newRating.getRating();
    }
    private setSitterImage(value: string): void {
        if (!utils.isHttpValid(value)) {
            throw new Error('CSV Error: CSV contains row with invalid url for the sitter image column.');
        }
        this.sitterImage = value;
    }
    private setEndDate(value: string): void {
        // expected input date format: YYYY-MM-DD
        if (!utils.isDateValid(value)) throw new Error('CSV Error: CSV contains row with invalid date in the end date column.');
        this.endDate = value;
    }
    private setText(value: string): void {
        this.text = value;
    }
    private setOwnerImage(value: string): void {
        if (!utils.isHttpValid(value)) {
            throw new Error('CSV Error: CSV contains row with invalid url for the owner image column.');
        }
        this.ownerImage = value;
    }
    private setDogs(value: string): void {
        this.dogs = [];
        const names = value.split('|');
        if (names.length > 1) {
            names.forEach((name: string) => {
                if (name !== '') this.dogs.push(name);
            });
        } else {
            if (value !== '') this.dogs.push(value);
        }
    }
    private setSitter(value: string): void {
        this.sitter = value;
    }
    private setOwner(value: string): void {
        this.owner = value;
    }
    private setStartDate(value: string): void {
        // expected input date format: YYYY-MM-DD
        if (!utils.isDateValid(value)) {
            throw new Error('CSV Error: CSV contains row with invalid date in the start date column.');
        }
        this.startDate = value;
    }
    private setSitterPhoneNumber(value: string): void {
        if (!utils.isPhoneNumberValid(value)) {
            throw new Error('CSV Error: CSV contains row with invalid phone number in the sitter phone number column.');
        }
        this.sitterPhoneNumber = value;
    }
    private setSitterEmail(value: string): void {
        if (!utils.isPossibleEmail(value)) {
            throw new Error('CSV Error: CSV contains row with incorrectly formatted email in the sitter email column.');
        }
        this.sitterEmail = value;
    }
    private setOwnerPhoneNumber(value: string): void {
        if (!utils.isPhoneNumberValid(value)) {
            throw new Error('CSV Error: CSV contains row with invalid phone number in the owner phone number column.');
        } else {
            this.ownerPhoneNumber = value;
        }
    }
    private setOwnerEmail(value: string): void {
        if (!utils.isPossibleEmail(value)) {
            throw new Error('CSV Error: CSV contains row with incorrectly formatted email in the owner email column.');
        }
        this.ownerEmail = value;
    }
    private setResponseTimeMinutes(value: string): void {
        const valueNumber: number = parseFloat(value);
        const errorMessageMinutes = 'CSV Error: CSV contains row with invalid number in the response time minutes column.';
        if (!Number.isInteger(valueNumber) || Number.isNaN(valueNumber) || valueNumber < 0) {
            throw new Error(errorMessageMinutes);
        }
        this.responseTimeMinutes = valueNumber;
    }
}