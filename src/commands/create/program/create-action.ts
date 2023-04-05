import path from 'path';
import inquirer from 'inquirer';
import { createFiles } from '../model/create-files';
import { getOutputDir } from '../model/get-output-dir';
import { Options } from '@/types';
import { readConfig } from '@/utils/config';
import { error } from '@/utils/message';
import { validate } from '@/utils/validate';

export async function createAction(configPath: string, templateName: string, options: Options): Promise<void> {
  const { templatesPath, templates, filesCase = 'kebab' } = readConfig(configPath);
  const template = templates.find((t) => t.name === templateName);

  if (!template) {
    error(`Template "${templateName}" not found.`);
    return;
  }

  const templateDir = path.join(templatesPath, template.templatePath);
  const replaceRules = template.replaceRules || [];
  const replaceValues = await inquirer.prompt(replaceRules.map((rule) => ({
    type: 'input',
    name: rule.keyword,
    message: `Enter value for replace ${rule.keyword} keyword:`,
    validate: (value) => validate(value, 'Replace value'),
  })));

  const outputDir = await getOutputDir({
    template,
    options,
    replaceValues,
    filesCase,
  });

  try {
    await createFiles({
      templateDir,
      outputDir,
      replaceRules,
      replaceValues,
      filesCase,
    });
  } catch (e) {
    e instanceof Error && error(`Error during file creation: ${e.message}`);
  }
}
