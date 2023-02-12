let startYear = 2020;
let endYear = 2023;

function getLastDay(year, month) {
    const isLeapYear = ((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)
    const maxDays = [1, 3, 5, 7, 8, 10, 12]
    const middleDays = [4, 6, 9, 11]
    month = Number(month)
    if (month == 2) {
        if (isLeapYear) {
            return 29
        } else {
            return 28
        }
    } else if (maxDays.includes(month)) {
        return 31
    } else if (middleDays.includes(month)) {
        return 30
    }
}

// ‘{“lower”: “2018-02-01T00:00:00.000”, “upper”: “2018-02-01T12:00:00.000”}’
let template = `{"lower":$lower, "upper": $upper}`;

let result = '';
while (startYear <= endYear) {

    for (let currentMonth = 1; currentMonth <= 12; currentMonth++) {

        if (result) {
            result += ',';
        }

        let lp = [];
        let monthPrefix=`${startYear}-${currentMonth < 10 ? '0' + currentMonth : currentMonth}`;
        lp.push({
            lower: `"${monthPrefix}-01T00:00:00.000"`,
            upper: `"${monthPrefix}-03T00:00:00.000"`
        });         
        lp.push({
            lower: `"${monthPrefix}-03T00:00:00.000"`,
            upper: `"${monthPrefix}-05T00:00:00.000"`
        });
        lp.push({
            lower: `"${monthPrefix}-05T00:00:00.000"`,
            upper: `"${monthPrefix}-08T00:00:00.000"`
        });
        lp.push({
            lower: `"${monthPrefix}-08T00:00:00.000"`,
            upper: `"${monthPrefix}-10T00:00:00.000"`
        });
        lp.push({
            lower: `"${monthPrefix}-10T00:00:00.000"`,
            upper: `"${monthPrefix}-13T00:00:00.000"`
        });         
        lp.push({
            lower: `"${monthPrefix}-13T00:00:00.000"`,
            upper: `"${monthPrefix}-15T00:00:00.000"`
        });
        lp.push({
            lower: `"${monthPrefix}-15T00:00:00.000"`,
            upper: `"${monthPrefix}-18T00:00:00.000"`
        });
        lp.push({
            lower: `"${monthPrefix}-18T00:00:00.000"`,
            upper: `"${monthPrefix}-20T00:00:00.000"`
        });

        lp.push({
            lower: `"${monthPrefix}-20T00:00:00.000"`,
            upper: `"${monthPrefix}-23T00:00:00.000"`
        });         
        lp.push({
            lower: `"${monthPrefix}-23T00:00:00.000"`,
            upper: `"${monthPrefix}-25T00:00:00.000"`
        });
        lp.push({
            lower: `"${monthPrefix}-25T00:00:00.000"`,
            upper: `"${monthPrefix}-28T00:00:00.000"`
        });
        
        let lower = `"${monthPrefix}-28T00:00:00.000"`;
        let upper = '';
        if (currentMonth >= 12) {
            startYear++;
            upper = `"${startYear}-01-01T00:00:00.000"`;
        }
        else {
            upper = `"${startYear}-${(currentMonth + 1) < 10 ? '0' + (currentMonth + 1) : (currentMonth + 1)
                }-01T00:00:00.000"`;
        }

        lp.push({
            lower: lower, upper: upper
        });
        // console.log('lower:', lower);
        // console.log('upper:', upper);
        for (const l of lp) {
            result += template.replace('$lower', l.lower).replace('$upper', l.upper);
            result += ',';
        }

    }
}

console.log(result);