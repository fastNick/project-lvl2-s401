import rendersByFormat from './helper';

const getRender = (ast, format) => rendersByFormat[format](ast, format);

export default getRender;
