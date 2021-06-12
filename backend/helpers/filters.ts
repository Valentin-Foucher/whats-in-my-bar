import { Request } from 'express';
import { SchemaDefinition } from 'mongoose';

const getFilters = (req: Request, definition: SchemaDefinition<any>, excludedKeys?: Array<string>, additionalKeys?: Array<string>): {[key: string]: any} => {
  const filters = {};
  const allKeys = Object.keys(definition);
  let acceptedKeys = excludedKeys ? allKeys.filter((key) => !(excludedKeys.includes(key))) : allKeys;
  if (additionalKeys) {
    acceptedKeys = [...acceptedKeys, ...additionalKeys];
  };

  for (const [key, param] of Object.entries(req.query)) {
    if (acceptedKeys.includes(key.split('.')[0])) {
      filters[key] = param;
    };
  };

  return filters;
};

export { getFilters };
