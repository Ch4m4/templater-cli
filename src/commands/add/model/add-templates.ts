import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { createTemplateFiles } from './create-template-files';
import { getTemplateInfo } from './get-template-info';
import { Template } from '@/types';
import { success } from '@/utils/message';


export async function addTemplates(templatesPath: string, templates: Template[]): Promise<void> {
  const template: Template = await getTemplateInfo(templates);
  const templatePath = path.join(templatesPath, template.templatePath);

  if (!fs.existsSync(templatePath)) {
    fs.mkdirSync(templatePath);
    success(`Created directory ${templatePath}`);
  }

  await createTemplateFiles(templatesPath, template);

  templates.push(template);

  const { addAnother } = await inquirer.prompt({
    type: 'confirm',
    name: 'addAnother',
    message: 'Do you want to add another template?',
    default: false,
  });

  if (addAnother) {
    await addTemplates(templatesPath, templates);
  }
}
