/// <reference path="../lib/openrct2.d.ts" />

export function GetRandomName(theme: string, names: Record<string,string[]>) : string {
	let nameList: string[] = names[theme];
	var i = Math.floor(Math.random() * nameList.length);
	return nameList[i];
}

