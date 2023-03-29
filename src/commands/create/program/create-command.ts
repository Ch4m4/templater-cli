import { Command } from 'commander';
import { createAction } from './create-action';
import { Options } from '@/types';

export function createCommand(program: Command, configPath: string): void {
  program
    .command('create <templateName>')
    .description('Create files from template.')
    .alias('c')
    .option('-o, --output <path>', 'specify output directory')
    .action(async (templateName: string, options: Options) => (
      await createAction(configPath, templateName, options)
    ));
}
