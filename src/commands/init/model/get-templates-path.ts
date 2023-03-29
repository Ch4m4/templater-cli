import inquirer from 'inquirer';


export async function getTemplatesPath(): Promise<string> {
  const DEFAULT_PATH = './templates';

  const { templatesPath } = await inquirer.prompt({
    type: 'input',
    name: 'templatesPath',
    message: 'Templates path',
    default: DEFAULT_PATH,
  });

  return templatesPath;
}
