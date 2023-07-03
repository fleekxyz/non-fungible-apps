// QUESTION: should we add back in schema verification?

export const formatJSONResponse = (
  code: number,
  response: Record<string, unknown>
) => {
  return {
    statusCode: code,
    body: JSON.stringify(response),
  };
};
