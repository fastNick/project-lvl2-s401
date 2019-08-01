import { parse as parseIni } from 'ini';
import getData from './helper';

function IniParser(source) {
  this.source = source;
}

IniParser.prototype.toObject = function toObject() {
  const data = getData(this.source);
  return parseIni(data);
};

export default IniParser;
