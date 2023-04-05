import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { createFilesProps } from './create-files';
import { Case } from '@/types';
import { convertByCase } from '@/utils/convert-by-case';
import { success, warning } from '@/utils/message';

export async function createFile(props: createFilesProps, fileName: string): Promise<void> {
  const { templateDir, outputDir, replaceRules, replaceValues, filesCase } = props;
  const filePath = path.join(templateDir, fileName);
  let newFileContent = fs.readFileSync(filePath, 'utf-8');
  let newFileName = fileName;

  if (replaceRules && replaceValues) {
    for (const rule of replaceRules) {
      const regex = new RegExp(rule.keyword, 'g');
      const fileNameReplacement = convertByCase(replaceValues[rule.keyword], filesCase as Case);
      const contentReplacement = convertByCase(replaceValues[rule.keyword], rule.case as Case);

      newFileName = newFileName.replace(regex, fileNameReplacement);
      newFileContent = newFileContent.replace(regex, contentReplacement);
    }
  }

  const outputFilePath = path.join(outputDir, newFileName);

  if (fs.existsSync(outputFilePath)) {
    const { isOverwrite } = await inquirer.prompt({
      type: 'confirm',
      name: 'isOverwrite',
      message: `Output file "${outputFilePath}" already exists. Do you want to overwrite it?`,
    });

    if (!isOverwrite) {
      warning(`File "${outputFilePath}" creation cancelled`);
      return;
    }
  }

  fs.writeFileSync(outputFilePath, newFileContent);
  success(`Created file: ${outputFilePath}`);
}
