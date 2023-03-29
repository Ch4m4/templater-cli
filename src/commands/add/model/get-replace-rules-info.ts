import inquirer from 'inquirer';
import { ReplaceRules } from '@/types';
import { validate } from '@/utils/validate';

export async function getReplaceRulesInfo(): Promise<ReplaceRules[]> {
  const replaceRuleAnswers = await inquirer.prompt([
    {
      type: 'input',
      name: 'keyword',
      message: 'Keyword to replace',
      default: '__name__',
      validate: (value) => validate(value, 'Keyword to replace'),
    },
    {
      type: 'list',
      name: 'case',
      message: 'Replacement case',
      choices: [
        { name: 'camelCase', value: 'camel' },
        { name: 'PascalCase', value: 'pascal' },
        { name: 'kebab-case', value: 'kebab' },
        { name: 'snake_case', value: 'snake' },
        { name: 'UPPER_CASE', value: 'upper' },
        { name: 'lower case', value: 'lower' },
      ],
    },
  ]);

  const replaceRule = replaceRuleAnswers as ReplaceRules;

  const { addAnotherRule } = await inquirer.prompt({
    type: 'confirm',
    name: 'addAnotherRule',
    message: 'Do you want to add another replace rule?',
    default: false,
  });

  if (addAnotherRule) {
    const nextReplaceRules = await getReplaceRulesInfo();
    return [ replaceRule, ...nextReplaceRules ];
  }

  return [ replaceRule ];
}
