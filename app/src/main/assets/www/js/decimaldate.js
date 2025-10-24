/*!
 * decimaldate.js
 * Utility helpers to convert between ISO 8601 calendar dates and decimal year notation.
 *
 * Copyright (c) 2025 theRAGEhero
 * Released under the MIT License.
 */

const decimaldate = (() => {
    const DECIMAL_PLACES = 6;
    const ISO_DATE_REGEX = /^([+-]?)(\d{4,})-(\d{2})-(\d{2})$/;

    // Helper to emulate mathematical modulo for negative numbers.
    const mod = (value, divisor) => ((value % divisor) + divisor) % divisor;

    const isLeapYear = (year) => {
        if (!Number.isInteger(year)) {
            throw new Error(`isLeapYear() invalid year ${year}`);
        }

        // Astronomical year numbering (ISO 8601) extends the proleptic Gregorian calendar.
        if (mod(year, 400) === 0) return true;
        if (mod(year, 100) === 0) return false;
        return mod(year, 4) === 0;
    };

    const daysInMonth = (year, month) => {
        const baseLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const index = month - 1;
        if (index < 0 || index > 11) {
            throw new Error(`daysInMonth() invalid month ${month}`);
        }

        if (index === 1 && isLeapYear(year)) {
            return 29;
        }
        return baseLengths[index];
    };

    const isValidMonthDay = (year, month, day) => {
        if (!Number.isInteger(year)) return false;
        if (!Number.isInteger(month) || month < 1 || month > 12) return false;
        if (!Number.isInteger(day) || day < 1) return false;
        return day <= daysInMonth(year, month);
    };

    const parseIsoDate = (isoString) => {
        const match = ISO_DATE_REGEX.exec(isoString);
        if (!match) {
            throw new Error(`Invalid ISO date ${isoString}`);
        }

        const [, sign, yearDigits, monthDigits, dayDigits] = match;
        let year = parseInt(yearDigits, 10);
        if (sign === '-') year = -year;
        const month = parseInt(monthDigits, 10);
        const day = parseInt(dayDigits, 10);

        if (!isValidMonthDay(year, month, day)) {
            throw new Error(`Invalid calendar date ${isoString}`);
        }

        return { year, month, day };
    };

    const dayOfYear = (year, month, day) => {
        let total = 0;
        for (let m = 1; m < month; m += 1) {
            total += daysInMonth(year, m);
        }
        return total + day;
    };

    const formatIsoDate = (year, month, day) => {
        const padYear = (value) => {
            const abs = Math.abs(value).toString().padStart(4, '0');
            return value >= 0 ? abs : `-${abs}`;
        };
        const pad = (value) => value.toString().padStart(2, '0');
        return `${padYear(year)}-${pad(month)}-${pad(day)}`;
    };

    const iso2dec = (isoString) => {
        const { year, month, day } = parseIsoDate(isoString);
        const doy = dayOfYear(year, month, day) - 0.5; // snap to noon
        const yearLength = daysInYear(year);
        const decimal = year + (doy / yearLength);
        return parseFloat(decimal.toFixed(DECIMAL_PLACES));
    };

    const dec2iso = (decimal) => {
        if (!Number.isFinite(decimal)) {
            throw new Error(`dec2iso() invalid number ${decimal}`);
        }

        let year = Math.floor(decimal);
        let fraction = decimal - year;

        // Guard against rounding errors placing us just outside the [0,1) interval.
        if (fraction < 0) {
            fraction += 1;
            year -= 1;
        } else if (fraction >= 1) {
            fraction -= 1;
            year += 1;
        }

        const yearLength = daysInYear(year);
        const dayPosition = fraction * yearLength;
        const dayOfYearIndex = Math.min(yearLength - Number.EPSILON, Math.max(0, dayPosition));
        const dayNumber = Math.floor(dayOfYearIndex) + 1;

        let remainingDays = dayNumber;
        let month = 1;
        for (; month <= 12; month += 1) {
            const dim = daysInMonth(year, month);
            if (remainingDays > dim) {
                remainingDays -= dim;
            } else {
                break;
            }
        }

        return formatIsoDate(year, month, remainingDays);
    };

    const daysInYear = (year) => (isLeapYear(year) ? 366 : 365);

    return {
        DECIMALPLACES: DECIMAL_PLACES,
        iso2dec,
        dec2iso,
        daysinmonth: daysInMonth,
        daysinyear: daysInYear,
        isleapyear: isLeapYear,
        dayofyear: dayOfYear,
        isvalidmonthday: isValidMonthDay,
    };
})();
