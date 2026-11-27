import { chileanDate } from "../lib/economic-indicators";
import { loadIndicatorTables } from "../lib/server/economic-indicators";

export default {
  async fetch(request: Request) {
    if (request.method !== "GET") {
      return new Response(null, { status: 405, headers: { Allow: "GET" } });
    }

    const tables = await loadIndicatorTables();
    const today = chileanDate();
    const hasCurrentValues = tables.uf[today] && tables.utm[today.slice(0, 7)];

    return Response.json(tables, {
      headers: { "Cache-Control": hasCurrentValues ? "public, max-age=300, s-maxage=3600" : "no-store" },
    });
  },
};
