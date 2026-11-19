export function validateEnv(config: Record<string, unknown>) {
  if (typeof config.connection_string !== 'string' || !config.connection_string) {
    throw new Error('Thiếu connection_string trong .env');
  }
  if (typeof config.JWT_SECRET !== 'string' || config.JWT_SECRET.length < 16) {
    throw new Error('JWT_SECRET phải có và dài ít nhất 16 ký tự');
  }
  return config;
}