import { IsRollerCoaster, FindNearestRollerCoaster } from './helpers';

import GetRandomName from './names';

import { OpenConfigureUI, LoadConfig, myConfig } from './configure';

const main = (): void => {
  // Load configuration
  LoadConfig();

  // Set up UI
  ui.registerMenuItem('Configure RideNamer', () => {
    OpenConfigureUI();
  });
};

const boringRollerCoasterNameRegex: RegExp = /.*1/;
const boringFlatRideNameRegex: RegExp = /(.*) 1/;
const boringStallNameRegex: RegExp = /(.*?)( Stall)* 1/;
const maxStallDistanceForNaming: number = 40 * 32; // A tile is 32 units, I think

// Day's check for stalls to name
/*const daySubscription =*/
context.subscribe('interval.day', () => {
  //console.log('A day has passed');

  const { rides } = map;
  // TODO do the roller coasters first; then stalls
  /* eslint-disable no-param-reassign */
  rides.forEach((iride) => {
    if (myConfig == null) {
      return; // try again later something odd is happening
    }
    switch (iride.classification) {
      case 'ride':
        if (IsRollerCoaster(iride) && myConfig.nameRollerCoasters) {
          if (boringRollerCoasterNameRegex.test(iride.name)) {
            iride.name = GetRandomName(
              'generic',
              myConfig.rollerCoasterNameList,
            );
	    const isDuplicate: boolean = rides.some((jride) => {
              return jride.name === iride.name;
            });
            if (isDuplicate) {
              iride.name = "Spawn of " + iride.name;
            }
          }
        } else if (myConfig.removeNumberFromFlatRides) {
          const result = boringFlatRideNameRegex.exec(iride.name);
          if (result != null) {
            iride.name = result[1];
          }
        }
        break;
      case 'stall':
      case 'facility':
        if (myConfig.nameStallsAfterCoasters) {
          // Find the nearest roller coaster - name it after that, remove the # at the end
          const result = boringStallNameRegex.exec(iride.name);
          if (result != null) {
            // Find nearest coaster
            const searchResult: [Ride, number] = FindNearestRollerCoaster(
              iride,
              rides,
            );
            const distance: number = searchResult[1];
            const nearestRC: Ride = searchResult[0];
            const nearestRCHasGoodName: boolean = !boringRollerCoasterNameRegex.test(nearestRC.name);
            if (distance < maxStallDistanceForNaming && nearestRCHasGoodName) {
              iride.name = `${nearestRC.name}'s ${result[1]}`;
            }
          }
        }
        break;
      default:
    }
  });
});

export default main;
