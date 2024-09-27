import { Rating } from "./rating";
import utils from "./utils";

interface SitterType {
    email: string;
    name: string;
    profileScore: number;
    ratingsScore: number;
    searchScore: number;
    ratings: Array<number>;
}

export class Sitter {
    private email: string;
    private name: string;
    private profileScore: number;
    private ratingsScore: number;
    private searchScore: number;
    private ratings: Array<number>;

    public constructor(email: string, name: string, dbSitter?: SitterType) {
        if (dbSitter) {
            // this.initFromDBEntry(dbSitter);
        } else {
            if (name === '') {
                throw new Error('Sitter Error: cannot initialize sitter with empty name.');
            }
            if (email === '' || !utils.isPossibleEmail(email)) {
                throw new Error('Sitter Error: cannot initialize sitter with empty or invalid email.');
            }
            this.email = email;
            this.name = name;
            this.ratings = [];
            this.ratingsScore = 0;
            this.profileScore = 0;
            this.searchScore = 0;
            this.initProfileScore();
        }
    }

    // private initFromDBEntry(sitterData: SitterType) {
        /* Note: this would be an initialization option when getting sitter data from the DB */
    // }

    public updateRatings(rating: number) {
        const newRating = new Rating(rating);
        this.ratings.push(newRating.getRating());
        const getAverage = (list: Array<number>): number => list.reduce((sum, rating) => sum + rating)/list.length;
        let newSearchScore: number = 0;
        this.ratingsScore = getAverage(this.ratings);
        if (this.ratings.length < 10) {
            const profileWeight = (10 - this.ratings.length)/10;
            newSearchScore = (profileWeight * this.profileScore) + (this.ratings.reduce((sum, rating) => sum + rating * .1, 0));
        } else {
            newSearchScore = this.ratingsScore;
        }
        this.searchScore = newSearchScore;
    }

    public getRatings(): Array<number> {
        return this.ratings;
    }

    public getName(): string {
        return this.name;
    }
    public getEmail(): string {
        return this.email;
    }

    public getProfileScore(isFixedDecimal: boolean): string | number {
        return isFixedDecimal ? this.profileScore.toFixed(2) : this.profileScore;
    }
    public getRatingsScore(isFixedDecimal: boolean): string | number {
        return isFixedDecimal ? this.ratingsScore.toFixed(2) : this.ratingsScore;
    }
    public getSearchScoreFixed(): string {
        return this.searchScore.toFixed(2);
    }
    public getSearchScore(): number {
        return this.searchScore;
    }

    private initProfileScore() {
        const letterMap: Map<string, number> = new Map();
        let additions = 0;
        const isLetterTest = /[a-zA-Z]/
        for (let i = 0; i < this.name.length; i++) {
            const letter = this.name[i];
            if (isLetterTest.test(letter) && !letterMap.has(letter.toLowerCase())) {
                letterMap.set(letter.toLowerCase(), 1);
                additions++;
            }
        }
        this.profileScore = (additions/26 * 5);
        this.searchScore = this.profileScore;
    }
}