import { Request } from 'express';
import { SchemaDefinition } from 'mongoose';

const getFilters = (req: Request, definition: SchemaDefinition<any>, excludedKeys?: Array<string>): {[key: string]: string} => {
  const filters = {};
  const allKeys = Object.keys(definition);
  const acceptedKeys = excludedKeys ? allKeys.filter((key) => !(excludedKeys.includes(key))) : allKeys;

  for (const [key, param] of Object.entries(req.query)) {
    if (acceptedKeys.includes(key.split('.')[0]) && !(param instanceof Array)) {
      filters[key] = param as string;
    };
  };

  return filters;
};

export { getFilters };
