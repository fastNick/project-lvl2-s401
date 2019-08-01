import getData from './helper';

function JsonParser(source) {
  this.source = source;
}

JsonParser.prototype.toObject = function toObject() {
  const data = getData(this.source);
  return JSON.parse(data);
};

export default JsonParser;
