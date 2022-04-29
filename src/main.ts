import {
	IsRollerCoaster,
	FindNearestRollerCoaster
} from './helpers';

import { 
	GetRandomName
} from './names';

import {
	OpenConfigureUI,
	LoadConfig,
	myConfig,
} from './configure';


const main = (): void => {
	// Load configuration
	LoadConfig();

	// Set up UI
	ui.registerMenuItem("Configure RideNamer", function() {
		OpenConfigureUI();
	});
};

const boringRollerCoasterNameRegex : RegExp = /.*1/;
const boringFlatRideNameRegex : RegExp = /(.*) 1/;
const boringStallNameRegex : RegExp = /(.*?)( Stall)* 1/;
const maxStallDistanceForNaming : number = 40*32; // A tile is 32 units, I think

// Day's check for stalls to name
var daySubscription =
context.subscribe('interval.day', function() {
		console.log('A day has passed');

		let rides: Ride[] = map.rides
		// TODO do the roller coasters first; then stalls
		for (let iride of rides) {
			switch (iride.classification){
			case "ride": 
				if (IsRollerCoaster(iride) && myConfig.nameRollerCoasters) { 
					if (boringRollerCoasterNameRegex.test(iride.name)) {
						iride.name = GetRandomName("generic", myConfig.rollerCoasterNameList);
					}
				} else if (myConfig.removeNumberFromFlatRides) {
					let result = boringFlatRideNameRegex.exec(iride.name) 
					if (result != null) {
						iride.name = result[1]
					}
				}
				break;
			case "stall": 
			case "facility": 
				if (myConfig.nameStallsAfterCoasters) {
					// Find the nearest roller coaster - name it after that, remove the # at the end
					let result = boringStallNameRegex.exec(iride.name)
					if (result != null) {
						// Find nearest coaster
						let searchResult: [Ride, number] = FindNearestRollerCoaster(iride, rides);
						let distance: number = searchResult[1];
						let nearestRC: Ride = searchResult[0];
						if (distance < maxStallDistanceForNaming) {
							iride.name = nearestRC.name + "'s " + result[1];
						} 
					}
				}
				break;
			}
		}
	});

export default main;
