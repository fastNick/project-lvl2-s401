import { formattersByRender } from './generic';

const getFormatter = render => formattersByRender[render.name](render);

export default getFormatter;
