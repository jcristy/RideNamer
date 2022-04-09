import {
} from './helpers';

const main = (): void => {
  console.log(`Your plug-in has started!`);
  let rides: Ride[] = map.rides
  for (let iride of rides) {
    console.log(`Ride ${iride.name}`);
  }

};

export default main;
