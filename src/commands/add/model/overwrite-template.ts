import inquirer from 'inquirer';
import { Template } from '@/types';


export async function overwriteTemplate(templates: Template[], name: string): Promise<boolean> {
  const { isOverwrite } = await inquirer.prompt({
    type: 'confirm',
    name: 'isOverwrite',
    message: `Template with name "${name}" already exists. Do you want to overwrite it?`,
    default: false,
  });

  if (!isOverwrite) {
    return false;
  }

  const index = templates.findIndex((template) => template.name === name);
  templates.splice(index, 1);

  return true;
}
