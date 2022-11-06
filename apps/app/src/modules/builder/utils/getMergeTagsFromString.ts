import set from 'lodash/set';
import get from 'lodash/get';
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

export function replaceMergeTagsWithValuesInBody(
  content: string,
  values: Template.MergeTags
) {
  const nestedKeys = getAllNestedKeysFromOject(values);
  const regex = /\{{.*?\}}/g;
  let tagsPaths = content.match(regex);
  tagsPaths = [...new Set(tagsPaths)];

  if (tagsPaths == null) {
    return {};
  }

  for (const path of tagsPaths) {
    const newPath = path.replace('{{', '').replace('}}', '');

    if (nestedKeys.includes(newPath)) {
      const re = new RegExp(`${path}`, 'g');
      const toReplaceWith = get(values, newPath);

      if (typeof toReplaceWith === 'string')
        content = content.replace(re, toReplaceWith);
    }
  }

  return content;
}

function getAllNestedKeysFromOject(
  values: Template.MergeTags | string,
  prefix = ''
): Array<string> {
  return Object.keys(values).reduce((res, el) => {
    if (typeof values[el] === 'object' && values[el] !== null) {
      return [
        ...res,
        ...getAllNestedKeysFromOject(values[el], prefix + el + '.'),
      ];
    }
    return [...res, prefix + el];
  }, []);
}
