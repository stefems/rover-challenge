import { parsePhoneNumber } from 'libphonenumber-js'
import moment from 'moment';

function isHttpValid(url: string) {
    try {
      const newUrl = new URL(url);
      if (newUrl.protocol === 'http:' || newUrl.protocol === 'https:') {
        return true;
      } else return false;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false;
    }
}

function isDateValid(date: string) {
    const values = date.split('-');
    if (values.length !== 3) {
        return false
    }
    const momentDate = moment(date);
    if (!momentDate.isValid()) {
        return false
    }
    const futureCutoff = new Date();
    futureCutoff.setDate(futureCutoff.getDate() + 2);
    const pastCutoff = moment('2011-05-13') //happy birthday, Rover!
    if (momentDate.isBefore(pastCutoff) || momentDate.isAfter(moment(futureCutoff))) {
        return false;
    }
    return true;
}

function isPossibleEmail(email: string) {
    // email patterns are filled with exceptions and complexity, so the best approach is a basic regex
    const basicTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return basicTest.test(email);
}

function isPhoneNumberValid(number: string) {
    // using the isPossible method that only checks for the number of digits rather than using a regex for correct digit patterns.
    const phoneNumber = parsePhoneNumber(number);
    return phoneNumber.isPossible();
}

export default {
    isHttpValid,
    isDateValid,
    isPossibleEmail,
    isPhoneNumberValid
}