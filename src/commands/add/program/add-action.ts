import { addTemplates } from '../model/add-templates';
import { Config } from '@/types';
import { readConfig, writeConfig } from '@/utils/config';

export async function addAction(configPath: string): Promise<void> {
  const config: Config = readConfig(configPath);
  const { templatesPath, templates } = config;

  await addTemplates(templatesPath, templates);
  await writeConfig(configPath, config);
}
