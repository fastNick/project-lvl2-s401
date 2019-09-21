import formattersByFormat from './generic';

const getFormatter = render => formattersByFormat[render.format](render);

export default getFormatter;
