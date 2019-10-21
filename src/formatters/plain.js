import { flattenDeep } from 'lodash';
import { pathSeparator, complexValue } from './constantsPlain';

const getPath = render => (render.parent !== null ? [getPath(render.parent), render.key]
  .join(pathSeparator) : render.key);

const stringifyMapper = {
  object: () => complexValue,
  string: value => `'${value}'`,
};

const generateBaseString = render => `Property '${getPath(render)}' was `;

const stringify = value => (stringifyMapper[typeof value] ? stringifyMapper[typeof value](value)
  : value);

const stringifiersByRender = ({
  changed(render) { return [generateBaseString(render), `was updated. From ${stringify(render.valueOld)} to ${stringify(render.valueNew)}`].join(''); },
  deleted(render) { return [generateBaseString(render), 'removed'].join(''); },
  inserted(render) { return [generateBaseString(render), `added with value: ${stringify(render.value)}`].join(''); },
  nested(render) { return render.getChildren().filter(x => x.type !== 'not changed').map(child => this[child.type](child)); },
});

const plainFormatter = (stringifiersTree) => {
  const stringifiers = stringifiersTree
    .map(render => stringifiersByRender[render.type](render));
  return flattenDeep([stringifiers]).join('\n');
};

export default plainFormatter;
