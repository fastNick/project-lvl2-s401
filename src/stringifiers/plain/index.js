import { pathSeparator, complexValue } from './constants';

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
  changed: render => [generateBaseString(render), `was updated. From ${stringify(render.value.old)} to ${stringify(render.value.new)}`].join(''),
  deleted: render => [generateBaseString(render), 'removed'].join(''),
  inserted: render => [generateBaseString(render), `added with value: ${stringify(render.value)}`].join(''),
  nested: render => render.getChildren().filter(x => x.type !== 'not changed').map(x => x.toString()),
  'not changed': () => '',
});


const getStringifier = render => stringifiersByRender[render.type](render);

export default getStringifier;
