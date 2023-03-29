import { readJSON } from '../helpers';
import { error } from '../message';
import { isConfig } from './type-guards/is-config';
import { Config } from '@/types';

export function readConfig(configPath: string): Config {
  const config = readJSON(configPath);

  if (!isConfig(config)) {
    error('Invalid configuration file.');
    process.exit(1);
  }

  return config;
}
