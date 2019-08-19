
import { readFileSync } from 'fs';


const getData = (source) => {
  try {    
    return readFileSync(source, 'utf8');
  } catch (err) {
    console.log(`Error: ${err}`);
    return 'Error';
  }
};

export default getData;
