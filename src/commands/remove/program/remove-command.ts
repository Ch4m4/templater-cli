import { Command } from 'commander';
import { removeAction } from './remove-action';

export function removeCommand(program: Command, configPath: string) {
  program
    .command('remove')
    .description('Remove a template.')
    .alias('r')
    .action(async () => await removeAction(configPath));
}
