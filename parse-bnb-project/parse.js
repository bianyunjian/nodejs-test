import fs from 'fs';

let file = `C:\\Users\\byj\\Documents\\Web3Go\\demo\\nodejs-quick\\parse-bnb-project\\bnbchain_project_mapping.json`;
let content = fs.readFileSync(file, { encoding: 'utf-8' });

// console.log(content);

let obj = JSON.parse(content);

let data = obj.data.get_execution.execution_succeeded.data;

// console.log(data);
let result = '';
if (data) {
    for (const d of data) {
        let contract_address = d.contract_address + '';
        if (contract_address.startsWith('\\x')) {
            contract_address = contract_address.replace('\\x', '0x');
        }
        result += `${d.project_name},${contract_address},${d.project_type||'Others'} \r\n`;
    }
}

console.log(result);