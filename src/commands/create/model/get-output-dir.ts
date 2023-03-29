import fs from 'fs/promises';
import path from 'path';
import inquirer from 'inquirer';
import { Case, Options, Template } from '@/types';
import { convertByCase } from '@/utils/convert-by-case';
import { success } from '@/utils/message';

interface getOutputDirProps {
  template: Template;
  options: Options;
  replaceValues: Record<string, string>;
  filesCase?: Case;
}

export async function getOutputDir(props: getOutputDirProps): Promise<string> {
  const { template, options, replaceValues, filesCase = 'kebab' } = props;

  console.log(replaceValues);
  const defaultDir = Object.entries(replaceValues)
    .reduce((acc, [ key, value ]) => key === '__name__' ? value : value, '');

  const { filesDir } = await inquirer.prompt({
    type: 'input',
    name: 'filesDir',
    message: 'Enter the name of the directory where the files will be created',
    default: convertByCase(defaultDir, filesCase),
  });

  let outputDir = options.output || template.outputPath;
  outputDir = path.join(outputDir, filesDir);

  try {
    await fs.access(outputDir);
  } catch (e) {
    await fs.mkdir(outputDir, { recursive: true });
    success(`Created output directory: ${outputDir}`);
  }

  return outputDir;
}
