import IniParser from './IniParser';
import JsonParser from './JsonParser';
import YamlParser from './YamlParser';

export default {
  '.yml': source => new YamlParser(source).toObject(),
  '.json': source => new JsonParser(source).toObject(),
  '.ini': source => new IniParser(source).toObject(),
};
