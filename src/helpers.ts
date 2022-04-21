/// <reference path="../lib/openrct2.d.ts" />

export const isUiAvailable = typeof ui !== 'undefined';

export function IsRollerCoaster(ride: Ride) : boolean {
	let rideDefinition: RideObject = ride.object;
	let rideType: number = rideDefinition.rideType[0]; // not sure why it's an array nor what's in the other 2 elements that seemed to always be 255
	// Based off of https://github.com/OpenRCT2/OpenRCT2/blob/605112297d0681f0c85e2de185358f350104c282/src/openrct2/ride/Ride.h#L485
	let rollerCoasterTypes: number[] = [0,1,2,3,4,7,9,10,13,15,17,19,42,44,51,52,53,54,55,56,57,58,59,62,64,65,66,68,73,74,75,76,86,87,91,92,94,95,96,97];
	for (let rct of rollerCoasterTypes) {
		if (rideType < rct+.01 && rideType > rct-.01) {
			return true;
		}
	}
	return false
}

// FindNearestRollerCoaster finds the nearest roller coaster for the given Ride
export function FindNearestRollerCoaster(ride: Ride, ridesInPark: Ride[]) : [Ride,number] {
	let closestRide: Ride = null;
	let shortestDistance: number = 1000000000;
	let thisLocation: CoordsXYZ = ride.stations[0].entrance; 
	if (thisLocation == null) {
		thisLocation = ride.stations[0].start;
	}
	for (let iride of ridesInPark) {
		if (iride == ride || !IsRollerCoaster(iride)) {
			continue;
		}
		let candidateLocation: CoordsXYZ = iride.stations[0].entrance
		let distance: number = Math.sqrt(
			Math.pow(thisLocation.x - candidateLocation.x, 2) +
			Math.pow(thisLocation.y - candidateLocation.y, 2)
		) 
		if (distance < shortestDistance) {
			shortestDistance = distance;
			closestRide = iride;
		}	
	}
	return [closestRide,shortestDistance]
}
