import * as fs from 'fs';
import { parse } from 'csv';
import { Sitter } from './sitter';
import { Review } from './review';


export class Main {
    private reviews: Array<Review>;
    private sitters: Map<string, Sitter>; //string is sitter's email. assumption: sitter email will be unique.
    private filename: string;
    private delimiter: string;
    private columnCount: number;

    public constructor(filename: string, delimiter: string) {
        if (filename === '' || delimiter === '') {
            throw new Error('Filename and delimiter cannot be empty.')
        }
        this.filename = filename;
        this.delimiter = delimiter;
        this.columnCount = -1;
        this.reviews = [];
        this.sitters = new Map();
    }

    public async loadDataFromCSV(): Promise<void> {
        const reader = fs.createReadStream(this.filename);
        reader.on('error', function(e) {
            if (e.message.indexOf('no such file') !== -1) {
                throw new Error('CSV Error: file does not exist.');
            } else {
                throw new Error('CSV Error: other CSV error occurred.');
            }
        });
        const parser = reader.pipe(parse({ delimiter: this.delimiter }));
        for await (const record of parser) {
            if (this.columnCount === -1)  {
                this.setColumnCount(record);
            } else {
                const newReview = new Review(record, this.delimiter, this.columnCount);
                if (this.isReviewPossibleDuplicate(newReview)) {
                    throw new Error('CSV Error: possible duplicate review record found.');
                } else {
                    this.updateSitterInformation(newReview);
                    this.reviews.push(newReview);
                }
            }
        }
    }

    private isReviewPossibleDuplicate(newReview: Review): boolean {
        /* efficiency note:
            change this.reviews type from Array<Review> to Map<Sitter.email, Array<Reviews>> in order to
            more efficiently find and compare possible review duplicates.
        */
        return this.reviews.some((review) => Review.isPossibleDuplicate(review, newReview));
    }

    private outputSitters(): string {
        let output = `email,name,profile_score,ratings_score,search_score\n`;
        /* effeciency note:
            im not the biggest fan of converting a map into an array and then sorting it, but im not
            sure of another approach that would be worthwhile. a potential option is maintain a sorted
            array as a class member and update it each time we read in a review, but that is probably
            more comparisons (less efficient) than waiting to sort once all sitter instances have been
            created and updated.
        */
        const sortedSitters: Array<Sitter> = (Array.from(this.sitters.values())).sort((sitterA, sitterB) => {
            const aScore = parseFloat(sitterA.getSearchScoreFixed());
            const bScore = parseFloat(sitterB.getSearchScoreFixed());
            if (aScore === bScore) {
                const aName = sitterA.getName();
                const bName = sitterB.getName();
                return aName.localeCompare(bName, 'en', { ignorePunctuation: true });
            } else {
                return bScore - aScore;
            }
        });
        sortedSitters.forEach((sitter) => {
            output += `${sitter.getEmail()},${sitter.getName()},${sitter.getProfileScore(true)},${sitter.getRatingsScore(true)},${sitter.getSearchScoreFixed()}\n`;
        });
        return output;
    }

    public async outputSitterCSV(): Promise<void> {
        fs.writeFile('./sitters.csv', this.outputSitters(), (error) => {
            if (error) {
                throw new Error(`CSV Write Error: ${error}`);
            }
        });
    }

    public getReviews(): Array<Review> {
        return this.reviews;
    }
    public getSitters(): Map<string, Sitter> {
        return this.sitters;
    }

    private updateSitterInformation(review: Review): void {
        const reviewSitterEmail = review.getSitterEmail();
        const reviewSitterName = review.getSitterName();
        let sitter: Sitter;
        if (this.sitters.has(reviewSitterEmail)) {
            sitter = this.sitters.get(reviewSitterEmail)!; //using non-null assertion operator
        } else {
            sitter = new Sitter(reviewSitterEmail, reviewSitterName);
            this.sitters.set(reviewSitterEmail, sitter);
        }
        const reviewRating = review.getRating();
        sitter.updateRatings(reviewRating);
    }

    private setColumnCount(line: Array<string>): void {
        if (line.length === 0) {
            throw new Error('CSV Error: CSV Headings cannot be empty.')
        }
        this.columnCount = line.length;
    }
}


