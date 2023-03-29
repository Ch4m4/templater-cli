import inquirer from 'inquirer';

export async function getFilesCase() {
  const { filesCase } = await inquirer.prompt([
    {
      type: 'list',
      name: 'filesCase',
      message: 'What case should be used for file names?',
      choices: [
        { name: 'PascalCase', value: 'pascal' },
        { name: 'camelCase', value: 'camel' },
        { name: 'snake_case', value: 'snake' },
        { name: 'kebab-case', value: 'kebab' },
      ],
    },
  ]);

  return filesCase;
}
