export function ResponseGenerator(handler) {
  async function Responder(req, res) {
    try {
      const { status_code, result } = await handler(req, res);
      console.log(`[${handler.name}] ${status_code} => Sent response.`);
      return res.status(status_code).json(result);
    } catch (err) {
      console.log(`[${handler.name}] ${String(err)}`);
      return res.status(500).json({
        error: err.message,
      });
    }
  }
  return Responder;
}
