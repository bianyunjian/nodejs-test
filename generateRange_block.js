let startBlock = 0;
let endBlock = 3000 * 10000;
let offset = 20 * 10000;

let template = `{"lower":$lower, "upper": $upper}`;

let result = '';
while (startBlock <= endBlock) {

    if (result) {
        result += ',';
    }
    let lower = startBlock;
    let upper = startBlock + offset;

    result += template.replace('$lower', lower).replace('$upper', upper);

    startBlock = upper;
}

console.log(result);