import { Main } from "./main";

const FILENAME = 'reviews.csv';
const DELIMITER = ',';

const main = new Main(FILENAME, DELIMITER);

async function run(){
    await main.loadDataFromCSV();
    await main.outputSitterCSV();
}
run();
