function calcMean(nums) {
    const total = nums.reduce((a, c) => a + c, 0);

    let mean = total / nums.length;

    return mean;
}

function calcMedian(nums) {
    nums.sort((a, b) => a - b);

    let mid = Math.floor(nums.length / 2);

    return nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}

function calcMode(nums) {
    const obj = (result = nums.reduce((obj, c) => {
        obj[c] = ++obj[c] || 1;
        return obj;
    }, {}));

    return findHighest(obj);
}

const findHighest = (numsObj) => {
    let highest = -Infinity;
    let highestVal;
    for (const num in numsObj) {
        if (numsObj[num] > highest) {
            highest = numsObj[num];
            highestVal = num;
        }
    }
    return highestVal;
};

module.exports = {
    calcMean,
    calcMedian,
    calcMode,
};
