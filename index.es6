import _ from 'underscore';

export default function helloWorld() {
  _.times(10, (index) => {
    console.log(`[${index}] hello world!`);
  });
}
