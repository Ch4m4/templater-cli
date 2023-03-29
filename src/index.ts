import { createProgram } from './app/create-program';
import { registerCommands } from './app/register-commands';

function main() {
  const program = createProgram();
  registerCommands(program);
  program.parse();
}

main();
