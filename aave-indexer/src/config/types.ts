export interface IConfig {
  development: {};
  testing: {};
  staging: {};
  production: {};
}

export interface ConfigValues<T> {
  [key: string]: T;
}
