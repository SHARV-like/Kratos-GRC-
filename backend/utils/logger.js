const formatMeta = (meta) => {
  if (!meta) {
    return "";
  }

  return ` ${JSON.stringify(meta)}`;
};

const write = (level, message, meta) => {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${level.toUpperCase()}: ${message}${formatMeta(
    meta,
  )}`;

  if (level === "error") {
    console.error(line);
    return;
  }

  console.log(line);
};

module.exports = {
  info: (message, meta) => write("info", message, meta),
  warn: (message, meta) => write("warn", message, meta),
  error: (message, meta) => write("error", message, meta),
};
