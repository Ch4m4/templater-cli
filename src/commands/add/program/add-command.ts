import { Command } from 'commander';
import { addAction } from './add-action';

export function addCommand(program: Command, configPath: string) {
  program
    .command('add')
    .description('Add a new template.')
    .alias('a')
    .action(async () => await addAction(configPath));
}
