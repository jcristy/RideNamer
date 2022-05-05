/// <reference path="../lib/openrct2.d.ts" />

export class PluginConfig {
  configVersion: number;

  nameRollerCoasters: boolean;

  nameStallsAfterCoasters: boolean;

  removeNumberFromFlatRides: boolean;

  rollerCoasterNameList: Record<string, string[]>;

  constructor() {
    this.nameRollerCoasters = true;
    this.nameStallsAfterCoasters = true;
    this.removeNumberFromFlatRides = false;
    this.configVersion = 1;
    this.rollerCoasterNameList = { generic: rcGenericDefaultNameList };
  }
}

export var myConfig: PluginConfig; // eslint-disable-line import/no-mutable-exports,no-var

const pluginConfigPath: string = 'jcristy.ridenamer.config';

export function LoadConfig() {
  myConfig = context.sharedStorage.get(pluginConfigPath);
  if (!myConfig) {
    myConfig = new PluginConfig();
    save();
  } else if (myConfig.configVersion == null) {
    myConfig.removeNumberFromFlatRides = false; // Upgrade the configuration definition
    save();
  }
}

function save() {
  context.sharedStorage.set(pluginConfigPath, myConfig);
}

let handle;

export function OpenConfigureUI() {
  if (handle !== undefined) return;
  const layout: GridLayout = new GridLayout(6, 1, 224, 256);
  const widgets: Widget[] = [
    layout.DoMe({
      type: 'label',
      text: 'Because rides deserve names v[VI]{version}[/VI]',
    }),
    layout.DoMe({
      type: 'checkbox',
      text: 'Name Roller Coasters',
      isChecked: myConfig.nameRollerCoasters,
      onChange(isChecked) {
        myConfig.nameRollerCoasters = isChecked;
        save();
      },
    }),
    layout.DoMe({
      type: 'checkbox',
      text: 'Name stalls after Roller Coasters',
      isChecked: myConfig.nameStallsAfterCoasters,
      onChange(isChecked) {
        myConfig.nameStallsAfterCoasters = isChecked;
        save();
      },
    }),
    layout.DoMe({
      type: 'checkbox',
      text: 'Remove number from flat rides',
      isChecked: myConfig.removeNumberFromFlatRides,
      onChange(isChecked) {
        myConfig.removeNumberFromFlatRides = isChecked;
        save();
      },
    }),
    layout.DoMe({
      type: 'label',
      text: 'Carefully modify the name list in\n <openrct2 user directory>/plugin.store.json',
    }),
    layout.DoMe({
      type: 'button',
      text: 'Restore Defaults',
      onClick() {
        myConfig = new PluginConfig();
        save();
        handle.close(); // close the window to force reloading the values :-)
      },
    }),
  ];
  handle = ui.openWindow({
    classification: 'ride-namer-configure',
    height: 256,
    width: 256,
    title: 'Ride Namer - Options',
    onClose() {
      handle = undefined;
    },
    widgets,
  });
}

interface WidgetSpec {
  X: number;
  Y: number;
  Height: number;
  Width: number;
}

interface SparseWidget {}

class GridLayout {
  Rows: number;

  Columns: number;

  TotalHeight: number;

  TotalWidth: number;

  Margin: number;

  OffsetX: number;

  OffsetY: number;

  item: number; // for iterating

  constructor(
    rows: number,
    columns: number,
    totalHeight: number,
    totalWidth: number,
    margin: number = 5,
    offsetX: number = 0,
    offsetY: number = 10,
  ) {
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
    const spec: WidgetSpec = this.Next();
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
    const row: number = this.item % this.Rows;
    const col: number = Math.floor(this.item / this.Rows);
    return this.Spot(row, col);
  }

  Spot(row: number, col: number): WidgetSpec {
    const usableHeight: number = this.TotalHeight - 2 * this.Margin;
    const usableWidth: number = this.TotalWidth - 2 * this.Margin;
    const cellHeight: number = usableHeight / this.Rows;
    const cellWidth: number = usableWidth / this.Columns;
    const toReturn: WidgetSpec = {
      X: this.OffsetX + this.Margin + col * cellWidth,
      Y: this.OffsetY + this.Margin + row * cellHeight,
      Height: cellHeight,
      Width: cellWidth,
    };
    return toReturn;
  }
}

const rcGenericDefaultNameList: string[] = [
  /* eslint-disable vars-on-top */ 'Smiter',
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
  'Majesety',
];
