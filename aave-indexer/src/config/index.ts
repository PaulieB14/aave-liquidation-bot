import { config } from "./config";
import { ConfigValues } from "./types";

class ConfigHandler {
  private values: ConfigValues<unknown>;

  constructor() {
    this.values = {};
  }

  set<T>(key: string, value: T) {
    this.values[key] = value;
  }

  get(key: string) {
    return this.values[key];
  }

  loadConfigValues<T>(values: ConfigValues<T>) {
    Object.keys(values).forEach((key) => this.set(key, values[key]));
  }

  async loadEnvironmentConfig<T>(environmentConfig: ConfigValues<T>) {
    this.loadConfigValues(environmentConfig);
  }

  async load() {
    try {
      console.info(`[CONFIG] Loading config...`);

      await this.loadEnvironmentConfig(config);

      console.info(`[CONFIG] Successfully loaded config.`);
    } catch (err) {
      console.error("[CONFIG] Error loading config", err);
    }
  }
}

export const configuration = new ConfigHandler();
