export class Rating {
    private rating: number;

    public constructor(rating: string | number) {
        let valueNumber: number = 0;
        if (typeof rating === 'string') {
            valueNumber = parseFloat(rating);
        } else {
            valueNumber = rating;
        }
        if (!Number.isInteger(valueNumber)) {
            throw new Error('Rating Error: rating created with non-integer data in the rating column.');
        }
        if (Number.isNaN(valueNumber)) {
            throw new Error('Rating Error: rating created with non-number data in the rating column.');
        }
        if (valueNumber < 0 || valueNumber > 5) {
            throw new Error('Rating Error: rating created with value less than 0 or greater than 5.');
        }
        this.rating = valueNumber;
    }
    public getRating(){
        return this.rating;
    }
}