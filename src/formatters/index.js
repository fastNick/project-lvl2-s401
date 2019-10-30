import rendersByFormat from './generic';

const render = (ast, format) => rendersByFormat[format](ast, format);

export default render;
