import { Command } from 'commander';
import { initAction } from './init-action';


export function initCommand(program: Command, configPath: string): void {
  program
    .command('init')
    .description('Initialize configuration file.')
    .alias('i')
    .action(async () => await initAction(configPath));
}
