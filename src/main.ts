import {
	IsRollerCoaster,
	FindNearestRollerCoaster
} from './helpers';

import { 
	GetRandomName
} from './names';

const main = (): void => {
  console.log(`Your plug-in has started!`);

};

const boringRollerCoasterNameRegex : RegExp = /.*1/;
const boringStallNameRegex : RegExp = /(.*) 1/;


// Day's check for stalls to name
var daySubscription =
        context.subscribe('interval.day', function() {
		console.log('A day has passed');
        });

var rideRatingSubscription =
        context.subscribe('ride.ratings.calculate', function() {
		console.log('A ride has been rated');
  		let rides: Ride[] = map.rides
		// TODO do the roller coasters first; then stalls
		for (let iride of rides) {
			console.log(`Ride ${iride.name} type ${iride.classification} exc ${iride.excitement}`);
			switch (iride.classification){
				case "ride": 
					if (IsRollerCoaster(iride)) { 
						if (boringRollerCoasterNameRegex.test(iride.name)) {
							iride.name = GetRandomName();
						}
						
					} else {
						console.log('not a roller coaster');
						// If a ride is not named <flat type> 1, <flat type> 1 will be reused :-/
					}
					
					break;
				case "stall": 
				case "facility": 
					// Find the nearest roller coaster - name it after that, remove the # at the end
					var result = boringStallNameRegex.exec(iride.name)
					if (result != null) {
						// Find nearest coaster
						let nearestRC: Ride = FindNearestRollerCoaster(iride, rides);
						iride.name = nearestRC.name + "'s " + result[1];
					}
					break;
			}
			// if it's a stall, do nothing

			// if it's a flat ride, just remove the number

			// if it's a roller coaster generate a name
		}
        });

export default main;
