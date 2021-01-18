var liquorList = [{
    frequency: 12
}, {
    frequency: 10
}, {
    frequency: 4
}, {
    frequency: 5
}];

var highestFrequency = Math.max(...liquorList.map(x => x.frequency));
var liquorPopularityList = liquorList.map(x => {
    const popularity = (x.frequency / highestFrequency).toFixed(4);
    x.popularity = popularity;
    return x;
})

console.log(liquorPopularityList);