import fs from 'fs';
import { createFile } from './create-file';
import { Case, ReplaceRules } from '@/types';
import { error } from '@/utils/message';

export interface createFilesProps {
  templateDir: string;
  outputDir: string;
  replaceRules?: ReplaceRules[];
  replaceValues?: Record<string, string>;
  filesCase?: Case;
}


export async function createFiles(props: createFilesProps): Promise<void> {
  const { templateDir, outputDir } = props;

  if (!fs.existsSync(templateDir)) {
    error(`Template directory '${templateDir}' does not exist.`);
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(templateDir);

  for (const file of files) {
    await createFile(props, file);
  }
}
