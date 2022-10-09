import set from 'lodash/set';
import { Template } from '@/types/template.types';

export function getMergeTagsFromString(content: string) {
  const regex = /\{{.*?\}}/g;
  const tagsPaths = content.match(regex);

  if (tagsPaths == null) {
    return {};
  }

  const tags: Template.MergeTags = {};

  for (const path of tagsPaths) {
    const newPath = path.replace('{{', '').replace('}}', '');
    set(tags, newPath, '');
  }

  return tags;
}
