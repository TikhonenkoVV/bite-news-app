export const testInput = input => {
    let res;
    let counter = 0;
    let arr = [];
    let initStr = 'The password must ';
    let testChar;
    let testUpper;
    let testLower;
    let testNumber;
    let testLength;
    // 'The password must consist only of Latin letters and numbers, must contain at least one uppercase letter, one lowercase letter and one number. The length of the password is from 8 to 16 characters';
    // console.log('up ' + /^(?=.*[A-Z]).{1,}$/.test(input));
    // console.log(
    //     'char ' + /^[a-zA-Z0-9]+(([a-zA-Z0-9])?[a-zA-Z0-9]*)*$/.test(input)
    // );
    // console.log('low ' + /^(?=.*[a-z]).{1,}$/.test(input));
    // console.log('num ' + /^(?=.*[0-9]).{1,}$/.test(input));
    if (!/^[a-zA-Z0-9]+(([a-zA-Z0-9])?[a-zA-Z0-9]*)*$/.test(input)) {
        testChar = 'consist only of Latin letters and numbers';
    }
    if (!/^(?=.*[A-Z]).{1,}$/.test(input)) {
        testUpper = 'one uppercase letter';
        counter += 1;
        arr.push(testUpper);
        console.log('up');
    }
    if (!/^(?=.*[a-z]).{1,}$/.test(input)) {
        testLower = 'one lowercase letter';
        counter += 1;
        arr.push(testLower);
        console.log('low');
    }
    if (!/^(?=.*[0-9]).{1,}$/.test(input)) {
        testNumber = 'one number';
        counter += 1;
        arr.push(testNumber);
        console.log('num');
    }
    if (!/^.{8,16}$/.test(input)) {
        testLength = 'The length of the password is from 8 to 16 characters.';
    }
    if (counter === 0 && testChar) res = `${initStr}${testChar}.`;
    if (counter === 1) {
        testChar
            ? (res = `${initStr}${testChar} and contain at least ${arr[0]}.`)
            : (res = `${initStr}contain at least ${arr[0]}.`);
    }
    if (counter === 2) {
        testChar
            ? (res = `${initStr}${testChar}, contain at least ${arr[0]} and at least ${arr[1]}.`)
            : (res = `${initStr}contain at least ${arr[0]} and at least ${arr[1]}.`);
    }
    if (counter === 3) {
        testChar
            ? (res = `${initStr}${testChar}, contain at least ${arr[0]}, at least ${arr[1]} and at least ${arr[2]}.`)
            : (res = `${initStr}contain at least ${arr[0]}, at least ${arr[1]} and at least ${arr[2]}.`);
    }
    // if (counter === 4) {
    //     testChar
    //         ? (res = `${initStr}${testChar}, contain at least ${arr[0]}, at least ${arr[1]}, at least ${arr[2]} and at least ${arr[3]}.`)
    //         : (res = `${initStr}contain at least ${arr[0]}, at least ${arr[1]}, at least ${arr[2]} and at least ${arr[3]}.`);
    // }
    if (testLength) res ? (res = `${res} ${testLength}`) : (res = testLength);

    return res;
};
