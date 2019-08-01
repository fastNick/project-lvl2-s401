import { safeLoad } from 'js-yaml';
import getData from './helper';

function YamlParser(source) {
  this.source = source;
}

YamlParser.prototype.toObject = function toObject() {
  const data = getData(this.source);
  return safeLoad(data);
};

export default YamlParser;
