import {
  extname,
} from 'path';

import IniParser from './IniParser';
import JsonParser from './JsonParser';
import YamlParser from './YamlParser';


const convertToObject = (source) => {
  switch (extname(source)) {
    case '.yml':
      return new YamlParser(source).toObject();
    case '.json':
      return new JsonParser(source).toObject();
    case '.ini':
      return new IniParser(source).toObject();
    default:
      throw new Error('Unsopported extension of source');
  }
};

export default convertToObject;
