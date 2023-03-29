import fs from 'fs/promises';
import path from 'path';
import inquirer from 'inquirer';
import { Template } from '@/types';
import { success } from '@/utils/message';
import { validate } from '@/utils/validate';


export async function createTemplateFiles(templatesPath: string, template: Template) {
  const { createFiles } = await inquirer.prompt({
    type: 'confirm',
    name: 'createFiles',
    message: `Do you want to create a file for the "${template.name}" template?`,
    default: true,
  });

  if (!createFiles) {
    return;
  }

  const { fileName } = await inquirer.prompt({
    type: 'input',
    name: 'fileName',
    message: 'Enter the file name:',
    validate: (value) => validate(
      value,
      'File name',
      { spaces: true, slashes: true, fileExtension: true },
    ),
  });

  const filePath = path.join(templatesPath, template.templatePath, fileName);

  await fs.writeFile(filePath, '');

  success(`File "${filePath}" created successfully.`);

  await createTemplateFiles(templatesPath, template);
}
