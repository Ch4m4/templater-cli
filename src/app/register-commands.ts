import { Command } from 'commander';
import { addCommand } from '@/commands/add';
import { createCommand } from '@/commands/create';
import { initCommand } from '@/commands/init';
import { listCommand } from '@/commands/list';
import { removeCommand } from '@/commands/remove';

export function registerCommands(program: Command): void {
  const configPath = program.opts().config as string;

  initCommand(program, configPath);
  addCommand(program, configPath);
  createCommand(program, configPath);
  removeCommand(program, configPath);
  listCommand(program, configPath);
}
