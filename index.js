// what are the odds of going out on first turn in dominoes?

require('lodash.product');
const _ = require('lodash');

const allButIndex = (array, i) => [
  ...array.slice(0, i),
  ...array.slice(i+1, array.length)
];

const maxDomino = 12;
const handSize = 12;

const allNumbers = _.range(0, maxDomino + 1);
const allDominoes = _.product(allNumbers, allNumbers);

const randomHand = (n) => _.sampleSize(allDominoes, n || handSize);


// expected running time = O((2*handSize/maxDomino)^handSize)
const longestChainFrom = (dominoes, beginWith = null) => _(dominoes)
  .map((domino, i) => {
    console.error('Depth:', 12 - dominoes.length);
    const remainingDominoes = allButIndex(dominoes, i);

    if (beginWith === null || domino.includes(beginWith)) {
      const [nextBeginWith, _beginWith] = _.sortBy(domino, n => n === beginWith);
      return [
        [_beginWith, nextBeginWith],
        ...longestChainFrom(remainingDominoes, nextBeginWith)
      ];
    } else {
      return longestChainFrom(remainingDominoes, beginWith);
    }
  })
  .maxBy('length') || [];

////

let hand = randomHand();
console.log(hand);
const longestChain = longestChainFrom(hand, 12);
console.log(longestChain);
