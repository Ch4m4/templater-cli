import fs from 'fs';
import { error } from './message';


export function readJSON(path: string) {
  try {
    return JSON.parse(fs.readFileSync(path).toString());
  } catch (e) {
    error(`File "${path}" not found.`);
  }
}

export function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    error(message);
    process.exit(1);
  }
}
