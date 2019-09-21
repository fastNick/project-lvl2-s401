import { formattersByRender } from './generic';

const getFormatter = render => formattersByRender[render.nodeName](render);

export default getFormatter;
