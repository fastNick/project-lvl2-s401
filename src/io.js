import { readFileSync } from 'fs';
import { extname } from 'path';

export const getExtension = source => extname(source);

export const getContent = source => readFileSync(source, 'utf8');
