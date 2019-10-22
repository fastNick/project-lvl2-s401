import { flattenDeep } from 'lodash';
import { pathSeparator, complexValue } from './constantsPlain';

const getPath = nodeFormatter => (nodeFormatter.parent !== null ? [getPath(nodeFormatter.parent),
  nodeFormatter.key]
  .join(pathSeparator) : nodeFormatter.key);

const stringifyMapper = {
  object: () => complexValue,
  string: value => `'${value}'`,
};

const generateBaseString = nodeFormatter => `Property '${getPath(nodeFormatter)}' was `;

const stringify = value => (stringifyMapper[typeof value] ? stringifyMapper[typeof value](value)
  : value);

const stringifiersByType = ({
  changed(nodeFormatter) { return [generateBaseString(nodeFormatter), `was updated. From ${stringify(nodeFormatter.valueOld)} to ${stringify(nodeFormatter.valueNew)}`].join(''); },
  deleted(nodeFormatter) { return [generateBaseString(nodeFormatter), 'removed'].join(''); },
  inserted(nodeFormatter) { return [generateBaseString(nodeFormatter), `added with value: ${stringify(nodeFormatter.value)}`].join(''); },
  nested(nodeFormatter) { return nodeFormatter.getChildren().filter(x => x.type !== 'not changed').map(child => this[child.type](child)); },
});

const plainFormatter = (stringifiersTree) => {
  const stringifiers = stringifiersTree
    .map(nodeFormatter => stringifiersByType[nodeFormatter.type](nodeFormatter));
  return flattenDeep([stringifiers]).join('\n');
};

export default plainFormatter;
