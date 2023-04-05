import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { readConfig, writeConfig } from '@/utils/config';
import { error, success } from '@/utils/message';

export async function removeAction(configPath: string): Promise<void> {
  const { templates, templatesPath, filesCase } = readConfig(configPath);

  const templatesNames = templates.map(({ name, description }) => ({
    name: description?.trim() ? `${name} - ${description}` : name,
    value: name,
  }));

  if (!templatesNames.length) {
    error('There are no templates to remove.');
    return;
  }

  const { templateName } = await inquirer.prompt({
    type: 'list',
    name: 'templateName',
    message: 'Select a template to remove:',
    choices: templatesNames,
  });

  const { confirm } = await inquirer.prompt({
    type: 'confirm',
    name: 'confirm',
    message: `Are you sure you want to remove the template "${templateName}"?`,
  });

  if (confirm) {
    const newTemplates = templates.filter(({ name }) => name !== templateName);

    const { isRemoveFolder } = await inquirer.prompt({
      type: 'confirm',
      name: 'isRemoveFolder',
      message: `Do you want to remove the template folder "${templateName}"?`,
    });

    if (isRemoveFolder) {
      fs.rmSync(path.join(templatesPath, templateName), { recursive: true });
      success(`The template folder "${templateName}" was removed.`);
    }

    await writeConfig(configPath, { templatesPath, filesCase, templates: newTemplates });
  }
}
