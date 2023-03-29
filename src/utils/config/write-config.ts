import fs from 'fs';
import { error } from '../message';
import { isConfig } from './type-guards/is-config';
import { Config } from '@/types';

export async function writeConfig(configPath: string, config: Config, sort = true): Promise<void> {
  if (!isConfig(config)) {
    error('Invalid configuration object.');
    process.exit(1);
  }

  if (sort) {
    config.templates.sort((a, b) => a.name.localeCompare(b.name));
  }

  try {
    await fs.promises.writeFile(configPath, JSON.stringify(config, null, 2));
  } catch (e) {
    if (e instanceof Error) {
      error(`Error writing configuration file: ${e.message}`);
    } else {
      error('An unknown error occurred while writing the configuration file.');
    }
    process.exit(1);
  }
}
