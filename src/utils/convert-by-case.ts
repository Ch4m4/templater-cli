import { Case } from 'src/types';

export function convertByCase(str: string, rule: Case): string {
  switch (rule) {
  case 'lower':
    return str.toLowerCase();
  case 'upper':
    return str.replace(/\s+/g, '_').toUpperCase();
  case 'camel':
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
      if (+match === 0) return '';
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  case 'pascal':
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => {
      return +match === 0 ? '' : match.toUpperCase();
    });
  case 'kebab':
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/\s+/g, '-')
      .toLowerCase();
  case 'snake':
    return str
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/\s+/g, '_')
      .toLowerCase();
  default:
    return str;
  }
}
