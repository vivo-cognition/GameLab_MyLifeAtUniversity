import { withQuery } from './with-query';
import { withGame } from './with-game';
import { OpenAPI } from '../../shared/api/generated/core/OpenAPI';

OpenAPI.BASE = import.meta.env.VITE_API_URL;

export const withProviders = (component: any) => {
  return withGame(withQuery(component));
};
