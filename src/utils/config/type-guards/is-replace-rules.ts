import { isCase } from './is-case';
import { ReplaceRules } from '@/types';
import { assert } from '@/utils/helpers';

function validateReplaceRulesKeyword(replaceRules: ReplaceRules): void {
  const message = `Invalid replaceRules keyword: ${JSON.stringify(replaceRules.keyword)}`;
  assert(typeof replaceRules.keyword === 'string', message);
}

function validateReplaceRulesCase(replaceRules: ReplaceRules): void {
  const message = `Invalid replaceRules case: ${JSON.stringify(replaceRules.case)}`;
  assert(!('case' in replaceRules) || isCase(replaceRules.case), message);
}

export function isReplaceRules(obj: unknown): obj is ReplaceRules {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const replace = obj as ReplaceRules;
  validateReplaceRulesKeyword(replace);
  validateReplaceRulesCase(replace);

  return true;
}
