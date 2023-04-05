import { readConfig } from '@/utils/config';
import { info } from '@/utils/message';

export async function listAction(configPath: string): Promise<void> {
  const { templates } = readConfig(configPath);

  info('Available templates:');
  templates.map(({ name, description }) => {
    info(`${name} - ${description}`);
  });
}
