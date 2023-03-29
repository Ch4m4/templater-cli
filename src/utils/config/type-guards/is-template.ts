import { isReplaceRules } from './is-replace-rules';
import { Template } from '@/types';
import { assert } from '@/utils/helpers';

function validateTemplateName(template: Template): void {
  const message = `Invalid Template name: ${JSON.stringify(template.name)}`;
  assert(typeof template.name === 'string', message);
}

function validateTemplatePaths(template: Template): void {
  const messageTemplatePath = `Invalid Template templatePath: ${JSON.stringify(template.templatePath)}`;
  const messageOutputPath = `Invalid Template outputPath: ${JSON.stringify(template.outputPath)}`;

  assert(typeof template.templatePath === 'string', messageTemplatePath);
  assert(typeof template.outputPath === 'string', messageOutputPath);
}

function validateTemplateDescription(template: Template): void {
  const message = `Invalid Template description: ${JSON.stringify(template.description)}`;
  assert(!('description' in template) || typeof template.description === 'string', message);
}

function validateTemplateReplaceRules(template: Template): void {
  const message = `Invalid Template replaceRules: ${JSON.stringify(template.replaceRules)}`;
  assert(!('replaceRules' in template) || (Array.isArray(template.replaceRules) && template.replaceRules.every(isReplaceRules)), message);
}

export function isTemplate(obj: unknown): obj is Template {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const template = obj as Template;
  validateTemplateName(template);
  validateTemplatePaths(template);
  validateTemplateDescription(template);
  validateTemplateReplaceRules(template);

  return true;
}
