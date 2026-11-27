import { loadIndicatorTables } from "../../lib/server/economic-indicators";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(await loadIndicatorTables());
}
