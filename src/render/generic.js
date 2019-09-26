const nestedChildrenByFormat = {
  jsonDiff: render => render.value,
  plain: render => render.value.filter(child => child.name !== 'not changed'),
  json: render => render.value,
};

export default nestedChildrenByFormat;
