/// <reference path="../lib/openrct2.d.ts" />

export const isUiAvailable = typeof ui !== 'undefined';

export function IsRollerCoaster(ride: Ride) : boolean {
  const rideDefinition: RideObject = ride.object;
  const rideType: number = rideDefinition.rideType[0]; // not sure why it's an array nor what's in the other 2 elements that seemed to always be 255
  // Based off of https://github.com/OpenRCT2/OpenRCT2/blob/605112297d0681f0c85e2de185358f350104c282/src/openrct2/ride/Ride.h#L485
  const rollerCoasterTypes: number[] = [0, 1, 2, 3, 4, 7, 9, 10, 13, 15, 17, 19, 42, 44, 51, 52, 53, 54, 55, 56, 57, 58, 59, 62, 64, 65, 66, 68, 73, 74, 75, 76, 86, 87, 91, 92, 94, 95, 96, 97];
  const found: boolean = rollerCoasterTypes.some((rct) => {
    if (rideType < rct + 0.01 && rideType > rct - 0.01) {
      return true;
    }
    return false;
  });
  return found;
}

// FindNearestRollerCoaster finds the nearest roller coaster for the given Ride
export function FindNearestRollerCoaster(ride: Ride, ridesInPark: Ride[]) : [Ride, number] {
  let closestRide: Ride = null;
  let shortestDistance: number = 1000000000;
  let thisLocation: CoordsXYZ = ride.stations[0].entrance;
  if (thisLocation == null) {
    thisLocation = ride.stations[0].start;
  }
  ridesInPark.forEach((iride) => {
    if (iride === ride || !IsRollerCoaster(iride)) {
      return;
    }
    const candidateLocation: CoordsXYZ = iride.stations[0].entrance;
    if (candidateLocation == null) {
      return; // ride has no entrance yet, skip
    }
    const distance: number = Math.sqrt(
      (thisLocation.x - candidateLocation.x) ** 2 + (thisLocation.y - candidateLocation.y) ** 2,
    );
    if (distance < shortestDistance) {
      shortestDistance = distance;
      closestRide = iride;
    }
  });
  return [closestRide, shortestDistance];
}
