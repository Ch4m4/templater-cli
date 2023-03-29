export interface Options {
  output?: string;
}

export interface Config {
  templatesPath: string;
  filesCase: Case;
  templates: Template[];
}

export interface Template {
  name: string;
  description?: string;
  templatePath: string;
  outputPath: string;
  replaceRules?: ReplaceRules[];
}

export interface ReplaceRules {
  keyword: string;
  case?: Case;
}


export type Case = 'lower' | 'upper' | 'camel' | 'pascal' | 'kebab' | 'snake';

