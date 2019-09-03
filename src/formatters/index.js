import renderMapper from './generic';

const getRender = (AST, format) => renderMapper[format](AST);

export default getRender;
