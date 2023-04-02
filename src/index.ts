import { createProgram } from './app/create-program';
import { registerCommands } from './app/register-commands';

export function templaterCLI() {
  const program = createProgram();
  registerCommands(program);
  program.parse();
}
