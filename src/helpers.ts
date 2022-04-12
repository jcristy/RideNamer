/// <reference path="../lib/openrct2.d.ts" />

export const isUiAvailable = typeof ui !== 'undefined';

export function IsRollerCoaster(rideType: number) : boolean {
	// Based off of https://github.com/OpenRCT2/OpenRCT2/blob/605112297d0681f0c85e2de185358f350104c282/src/openrct2/ride/Ride.h#L485
	let rollerCoasterTypes: number[] = [0,1,2,3,4,7,9,10,13,15,17,19,42,44,51,52,53,54,55,56,57,58,59,62,64,65,66,68,73,74,75,76,86,87,91,92,94,95,96,97];
	for (let rct of rollerCoasterTypes) {
		if (rideType < rct+.01 && rideType > rct-.01) {
			return true;
		}
	}

}

