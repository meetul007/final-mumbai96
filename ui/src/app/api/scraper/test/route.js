import { createTest } from '@/lib/scraper-service';

export async function POST(request) {
  try {
    const body = await request.json();
    const { location, category, params } = body;

    if (!location) {
      return Response.json({ error: 'Location is required' }, { status: 400 });
    }

    if (!category) {
      return Response.json({ error: 'Category is required' }, { status: 400 });
    }

    const testId = await createTest({
      location,
      category,
      params: params || {},
    });

    return Response.json({ testId });
  } catch (err) {
    console.error('[api/scraper/test]', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
