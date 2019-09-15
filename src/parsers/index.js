import dataTypeMapper from './generic';

const convertToObject = ({ extension, lines }) => dataTypeMapper[extension](lines);

export default convertToObject;
