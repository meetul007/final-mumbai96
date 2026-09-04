import { createBatch } from '@/lib/scraper-service';

export async function POST(request) {
  try {
    const body = await request.json();
    const { location, categories, params } = body;

    if (!location) {
      return Response.json({ error: 'Location is required' }, { status: 400 });
    }

    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return Response.json({ error: 'At least one category is required' }, { status: 400 });
    }

    const batchId = await createBatch({
      location,
      categories,
      params: params || {},
    });

    return Response.json({ batchId, message: 'Batch started' });
  } catch (err) {
    console.error('[api/scraper/start]', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
