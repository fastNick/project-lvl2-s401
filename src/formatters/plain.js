import { flattenDeep } from 'lodash';

const pathSeparator = '.';
const complexValue = '[complex value]';

const getPath = renderNode => (renderNode.parent !== null ? [getPath(renderNode.parent),
  renderNode.key]
  .join(pathSeparator) : renderNode.key);

const stringifyMapper = {
  object: () => complexValue,
  string: value => `'${value}'`,
};

const generateBaseString = renderNode => `Property '${getPath(renderNode)}' was `;

const stringify = value => (stringifyMapper[typeof value] ? stringifyMapper[typeof value](value)
  : value);

const stringifiersByType = ({
  changed(renderNode) { return [generateBaseString(renderNode), `was updated. From ${stringify(renderNode.valueOld)} to ${stringify(renderNode.valueNew)}`].join(''); },
  deleted(renderNode) { return [generateBaseString(renderNode), 'removed'].join(''); },
  inserted(renderNode) { return [generateBaseString(renderNode), `added with value: ${stringify(renderNode.value)}`].join(''); },
  nested(renderNode) { return renderNode.getChildren().filter(x => x.type !== 'not changed').map(child => this[child.type](child)); },
});

export default (rendersTree) => {
  const stringifiers = rendersTree
    .map(renderNode => stringifiersByType[renderNode.type](renderNode));
  return flattenDeep([stringifiers]).join('\n');
};
