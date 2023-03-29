import { Command } from 'commander';
import { Color } from '@/utils/consts';

export function createProgram(): Command {
  const program = new Command();

  program
    .name('templater')
    .version('0.1.0')
    .usage('<command> [options]')
    .option('-c, --config <path>', 'specify config file', 'templater.json')
    .configureOutput({
      outputError: (str, write) => write(Color.Red.replace('%s', str)),
    });

  return program;
}
