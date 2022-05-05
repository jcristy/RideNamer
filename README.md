# RideNamer

RideNamer helps with the tedious process of giving your rides, stalls, and roller coasters names.

## Description

New roller coasters, or more specifically roller coasters with "Something Something #" are given a random name.
In turn, stalls nearby are named "Roller Coaster's stall type". Finally, flat rides have the number removed.
Each of these can be turned off.

The idea is to automatically come up with more real world style naming.

## How To

### Install

Place the ridenamer.js file into the plugins folder.
* For Windows (untested) `C:Users\{User}\Documents\OpenRCT2\plugin`
* For Ubuntu and likely other Linux distributions `~/.config/OpenRCT2/plugin`

### Configure Names

Currently, there is not an in-game way to adjust the list of pre-defined names. However, you can modify the OpenRCT2 user config to
adjust the list of names. In Ubuntu, this file, I think, by default is in `$HOME/.config/OpenRCT2/plugin.store.json`. You can carefully
edit this file to add or modify the list of names it picks from.

## Roadmap & Known Bugs

### Roadmap
* Theme-based naming - nearby scenery used to narrow the list of possible names

### Bugs
* Duplicate names possible
* Stalls could be named after the game's default roller coaster name

## Acknowledgements

https://github.com/wisnia74/openrct2-typescript-mod-template
