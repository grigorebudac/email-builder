import { Template } from '@/types/template.types';

export const DEFAULT_MERGE_TAGS: Template.MergeTags = {
  user: {
    first_name: '',
    last_name: '',
    full_name: '',
    avatar: '',
  },
  address: {
    city: '',
    zip: '',
  },
};
