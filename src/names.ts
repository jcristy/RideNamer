/// <reference path="../lib/openrct2.d.ts" />

function GetRandomName(theme: string, names: Record<string, string[]>): string {
  const nameList: string[] = names[theme];
  const i = Math.floor(Math.random() * nameList.length);
  return nameList[i];
}

export default GetRandomName;
