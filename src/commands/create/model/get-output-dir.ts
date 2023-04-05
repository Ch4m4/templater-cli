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
  filesCase: Case;
}

const getDefaultDir = (replaceValues: Record<string, string>, filesCase: Case): string => {
  const keys = Object.keys(replaceValues);
  const defaultDir = keys.includes('__name__') ? replaceValues.__name__ : keys[0];

  return convertByCase(defaultDir, filesCase) || '';
};

export async function getOutputDir(props: getOutputDirProps): Promise<string> {
  const { template, options, replaceValues, filesCase } = props;
  const { filesDir } = await inquirer.prompt({
    type: 'input',
    name: 'filesDir',
    message: 'Enter the name of the directory where the files will be created',
    default: getDefaultDir(replaceValues, filesCase),
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
