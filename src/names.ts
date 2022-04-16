/// <reference path="../lib/openrct2.d.ts" />

export var rcDefaultNameList: string[] = [
'Smiter',
'Walloper',
'Tangle',
'Spire',
'Circuit',
'Resistor',
'Remarkable',
'Subverser',
'Combustor',
'Sparker',
'Orbiter',
'Provoker',
'Trouble Maker',
'Hellion',
'Contraption',
'Apparatus',
'Doo Hickey',
'Quark',
'Red shift',
'Entropy',
'Sublimator',
'Majesety'
];

export function GetRandomName() : string {
	var i = Math.floor(Math.random() * rcDefaultNameList.length);
	return rcDefaultNameList[i];
}

