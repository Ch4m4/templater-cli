import { Command } from 'commander';
import { listAction } from './list-action';

export function listCommand(program: Command, configPath: string): void {
  program
    .command('list')
    .description('Show all templates.')
    .alias('l')
    .action(async () => await listAction(configPath));
}
