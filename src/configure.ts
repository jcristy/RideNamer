/// <reference path="../lib/openrct2.d.ts" />

export class PluginConfig {
	nameRollerCoasters: boolean;
	nameStallsAfterCoasters: boolean;
	removeNumberFromFlatRides: boolean;
	rollerCoasterNameList: Record<string,string[]>;

	constructor(){
		this.nameRollerCoasters = true;
		this.nameStallsAfterCoasters = true;
		this.removeNumberFromFlatRides = false;
		this.rollerCoasterNameList = {"generic":rcGenericDefaultNameList};
	}
}

export var myConfig: PluginConfig;

const pluginConfigPath: string = "jcristy.ridenamer.config";

export function LoadConfig() {
	myConfig = context.sharedStorage.get(pluginConfigPath);
	if (!myConfig) {
		myConfig = new PluginConfig();
		save();
	} 
}

function save() {
	context.sharedStorage.set(pluginConfigPath, myConfig);
}

var handle = undefined;

export function OpenConfigureUI() {
	if (handle !== undefined)
		return;
	let row: number = 0;
	let layout: GridLayout = new GridLayout(6,1,224,256);
	let widgets:Widget[] = [
		layout.DoMe({
			type: "label",
			text: "Because rides deserve names",
		}),
		layout.DoMe({
			type: "checkbox",
			text: "Name Roller Coasters",
			isChecked: myConfig.nameRollerCoasters,
			onChange: function(isChecked) {
				myConfig.nameRollerCoasters = isChecked;
				save();
			},
		}),
		layout.DoMe({
			type: "checkbox",
			text: "Name stalls after Roller Coasters",
			isChecked: myConfig.nameStallsAfterCoasters,
			onChange: function(isChecked) {
				myConfig.nameStallsAfterCoasters = isChecked;
				save();
			},
		}),
		layout.DoMe({
			type: "checkbox",
			text: "Remove number from flat rides",
			isChecked: myConfig.removeNumberFromFlatRides,
			onChange: function(isChecked) {
				myConfig.removeNumberFromFlatRides = isChecked;
				save();
			},
		}),
		layout.DoMe({
			type: "label",
			text: "Carefully modify the name list in\n <openrct2 user directory>/plugin.store.json"
		}),
		layout.DoMe({
			type: "button",
			text: "Restore Defaults",
			onClick:  function() {
				myConfig = new PluginConfig();
				save();
				handle.close(); // close the window to force reloading the values :-)
			}
		}),
	]
	handle = ui.openWindow({
		classification: "ride-namer-configure",
		height: 256,
		width: 256,
		title: "Ride Namer - Options",
		onClose: function() {
			handle = undefined;
		},
		widgets: widgets
	});
}

interface WidgetSpec {
	X: number;
	Y: number;
	Height: number;
	Width: number;
}

interface SparseWidget {
	
}

class GridLayout {
	Rows: number;
	Columns: number;
	TotalHeight: number;
	TotalWidth: number;
	Margin: number;
	OffsetX: number;
	OffsetY: number;
	item: number; // for iterating

	constructor(rows: number, columns: number, totalHeight: number, totalWidth: number, margin: number = 5, offsetX: number = 0, offsetY: number = 10) {
		this.Rows = rows;
		this.Columns = columns;
		this.TotalHeight = totalHeight;
		this.TotalWidth = totalWidth;
		this.Margin = margin;
		this.OffsetX = offsetX;
		this.OffsetY = offsetY;
		this.item = -1;
	}

	DoMe(sparseWidget: any): any {
		let spec: WidgetSpec = this.Next()
		sparseWidget.x = spec.X;
		sparseWidget.y = spec.Y;
		sparseWidget.width = spec.Width;
		sparseWidget.height = spec.Height;
		return sparseWidget;
	}

	Next(): WidgetSpec {
		this.item++;
		return this.Here();
	}

	Here(): WidgetSpec {
		let row: number = this.item % this.Rows;
		let col: number = Math.floor(this.item / this.Rows);
		return this.Spot(row, col);
	}

	Spot(row: number, col: number): WidgetSpec {
		let usableHeight: number = this.TotalHeight - 2*this.Margin;
		let usableWidth: number = this.TotalWidth - 2*this.Margin;
		let cellHeight: number = usableHeight/this.Rows;
		let cellWidth: number = usableWidth/this.Columns;
		let toReturn: WidgetSpec = {
			X: this.OffsetX + this.Margin + col*cellWidth,
			Y: this.OffsetY + this.Margin + row*cellHeight,
			Height: cellHeight,
			Width: cellWidth
		}
		return toReturn;
	}
}

var rcGenericDefaultNameList: string[] = [
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
