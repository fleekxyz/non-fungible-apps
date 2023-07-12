// QUESTION: should we add back in schema verification?

export const formatJSONResponse = (
  code: number,
  response: Record<string, unknown>
) => {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(response),
  };
};
