import inquirer from 'inquirer';
import { addTemplates } from '@/commands/add';
import { Template } from '@/types';


export async function getTemplates(templatePath: string): Promise<Template[]> {
  const templates: Template[] = [];

  const { isAdd } = await inquirer.prompt({
    type: 'confirm',
    name: 'isAdd',
    message: 'Do you want to add templates now?',
    default: true,
  });

  if (isAdd) {
    await addTemplates(templatePath, templates);
  }

  return templates;
}
