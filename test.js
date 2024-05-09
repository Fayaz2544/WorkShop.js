// console.log('Hello World')

// let x = 10;

// x += 20 // x = x + 20

// x++ // x = x + 1

// x-- // x = x - 1

// console.log(x)

// let num = 10;

// if (num = 10) {
//     console.log('down')
// } else if (num > 10) {
//     console.log('up')
// }else{
//     console.log('eq');
// }

// let cal = num < 10 ? console.log('down') : (num > 10 ? console.log('up') : console.log('eq'))

// console.log(cal)

// var x = 50;
// var y = 70;


// if (x > y) {
//     console.log(x ,'x is max number', y, 'y is min number');
// }else if (y < x) {
//     console.log(x ,'x is max number', y, 'y is min number');
// } else {
//     console.log('numbers are equal');
// }

// var x = 80;
// var y = 90;

// var maxNumber, minNumber;

// if (x > y) {
//     maxNumber = x;
//     minNumber = y;

//     console.log(maxNumber + ' : x is max number.');
//     console.log(minNumber + ' : y is min number.');
// } else if (x < y) {
//     maxNumber = y;
//     minNumber = x;
    
//     console.log(maxNumber + ' : y is max number.');
//     console.log(minNumber + ' : x is min number.');
// } else {
//     console.log('Numbers are equal.');
// }

// var x = 110;
// var y = 100;

// if (x > y) {
//     console.log('x is max number.');
//     console.log('y is min number.');
// } else if (x < y) {
//     console.log('y is max number.');
//     console.log('x is min number.');
// } else {
//     console.log('Numbers are equal.');
// }

// if (maxNumber !== undefined && minNumber !== undefined) {
//     console.log(maxNumber + ' is max number.');
//     console.log(minNumber + ' is min number.');
// }

// if (maxNumber !== x && minNumber !== y) {
//     console.log(maxNumber + ' is max number.');
//     console.log(minNumber + ' is min number.');
// }

// if (maxNumber == x && minNumber == y) { 
//     console.log(maxNumber + ' is max number.'); 
//     console.log(minNumber + ' is min number.'); }

// const { fullname } = require('./fn')

// // console.log(fn)

// console.log(fullname('ทดสอบ', 'ระบบ'))

// let num1 = 10;
// let str = `1,2,3,4`
// // let str1 = '\''

// console.log(str.split())



// let arr = [1,2,3,4,5]
// arr.push(5)
// arr.pop()

// arr.unshift(0)
// arr.shift()
// // console.log(arr[1])

// let new_arr = arr.map((val, i, arr) => {
//     return val + 1
// })
// // console.log(new_arr)

// let filter_arr = arr.filter(val => {
//     return val < 3
// })

// console.log(filter_arr)


// let arr1 = [1,2]
// let arr2 = [4,5]

// console.log(...arr1, ...arr2)

let time1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(console.log('time1'))
        }, 1000);
    })
}

let time2 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(console.log('time2'))
        }, 2000);
    })
}


let show = async () => {
    try {
        await time2()
        await time1()
    } catch (error) {
        console.log(error)
    }
}

show()























