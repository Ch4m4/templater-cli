import inquirer from 'inquirer';
import { getReplaceRulesInfo } from './get-replace-rules-info';
import { overwriteTemplate } from './overwrite-template';
import { Template } from '@/types';
import { validate } from '@/utils/validate';

export async function getTemplateInfo(templates: Template[]): Promise<Template> {
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Template name',
    validate: (answer: string) => validate(answer, 'Template name', {
      spaces: true,
      slashes: true,
      dots: true,
      english: true,
    }),
  });

  const isExists = templates.some((template) => template.name === name);

  if (isExists) {
    const isOverwrite = await overwriteTemplate(templates, name);
    if (!isOverwrite) return getTemplateInfo(templates);
  }

  const { description, templatePath, outputPath, addReplace } = await inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: 'Template description',
    },
    {
      type: 'input',
      name: 'templatePath',
      message: 'Path to template',
      default: `./${name}`,
      validate: (answer: string) => validate(answer, 'Path to template', {
        path: true,
      }),
    },
    {
      type: 'input',
      name: 'outputPath',
      message: 'Output path (./src/..)',
      default: `./src/${name}`,
    },
    {
      type: 'confirm',
      name: 'addReplace',
      message: 'Do you want to add replace rules?',
      default: false,
    },
  ]);

  const replaceRules = addReplace ? await getReplaceRulesInfo() : [];

  return {
    name,
    description,
    templatePath,
    outputPath,
    replaceRules,
  };
}
