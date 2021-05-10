/**
 * @param {[]} arr
 * @param {function(left, right, number) : any} supplier
 * @returns {*[]}
 */
export function insertBetween(arr, supplier) {
    let res = [];
    for (let i = 0; i < arr.length - 1; i++) {
        res.push(arr[i]);
        res.push(supplier(arr[i], arr[i + 1], i));
    }
    res.push(arr[arr.length - 1]);
    return res;
}