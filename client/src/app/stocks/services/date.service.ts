import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateService {

    constructor() { }

    getFiveYearsAgo() {
        // Get the current date
        const currentDate = new Date();

        // Calculate the date five years ago
        const fiveYearsAgo = new Date(currentDate);
        fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5);

        // Format the date in ISO-8601 format
        const isoDate = fiveYearsAgo.toISOString().split('T')[0];

        console.log(isoDate);
    }

}
