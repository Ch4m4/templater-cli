import { Case } from '@/types';

export function isCase(value: unknown): value is Case {
  const validCases: Case[] = [ 'lower', 'upper', 'camel', 'pascal', 'kebab', 'snake' ];
  return typeof value === 'string' && validCases.includes(value as Case);
}
