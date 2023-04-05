import fs from 'fs';
import { getFilesCase } from '../model/get-files-case';
import { getTemplates } from '../model/get-templates';
import { getTemplatesPath } from '../model/get-templates-path';
import { Config } from '@/types';
import { writeConfig } from '@/utils/config';
import { error, success } from '@/utils/message';


export async function initAction(configPath: string): Promise<void> {
  if (!configPath) {
    error('Config path is not specified.');
    return;
  }

  if (!configPath.endsWith('.json')) {
    error(`${configPath} is not a JSON file.`);
    return;
  }

  if (fs.existsSync(configPath)) {
    error(`${configPath} already exists.`);
    return;
  }

  const templatesPath = await getTemplatesPath();

  if (!fs.existsSync(templatesPath)) {
    fs.mkdirSync(templatesPath);
    success(`Created directory ${templatesPath}`);
  }

  const filesCase = await getFilesCase();
  const templates = await getTemplates(templatesPath);
  const config: Config = {
    templatesPath,
    filesCase,
    templates,
  };

  writeConfig(configPath, config)
    .then(() => success(`Created config file ${configPath}`));
}
