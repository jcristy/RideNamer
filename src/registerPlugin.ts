import {} from 'openrct2';

import main from './main';

registerPlugin({
  name: 'RideNamer',
  version: '[VI]{version}[/VI]',
  authors: ['jcristy'],
  type: 'remote',
  licence: 'MIT',
  main,
  targetApiVersion: 34,
  minApiVersion: 10
});
