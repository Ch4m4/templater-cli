import { isCase } from './is-case';
import { isTemplate } from './is-template';
import { Config } from '@/types';
import { assert } from '@/utils/helpers';

function validateConfigTemplatesPath(config: Config): void {
  const message = `Invalid Config templatesPath: ${JSON.stringify(config.templatesPath)}`;
  assert(typeof config.templatesPath === 'string', message);
}

function validateConfigTemplates(config: Config): void {
  const message = `Invalid Config templates: ${JSON.stringify(config.templates)}`;
  assert(Array.isArray(config.templates) && config.templates.every(isTemplate), message);
}

function validateConfigFilesCase(config: Config): void {
  const message = `Invalid Config filesCase: ${JSON.stringify(config.filesCase)}`;
  assert(isCase(config.filesCase), message);
}

export function isConfig(obj: unknown): obj is Config {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const config = obj as Config;
  validateConfigTemplatesPath(config);
  validateConfigTemplates(config);
  validateConfigFilesCase(config);

  return true;
}
