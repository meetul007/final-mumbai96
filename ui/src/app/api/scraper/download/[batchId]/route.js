import { collectBatchResults, getBatchState } from '@/lib/scraper-service';

export async function GET(request, { params }) {
  const { batchId } = await params;

  try {
    const state = await getBatchState(batchId);
    if (!state) {
      return Response.json({ error: 'Batch not found' }, { status: 404 });
    }

    const data = await collectBatchResults(batchId);

    const filename = `scraper-results-${batchId}-${state.location}.json`;

    return new Response(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    console.error('[api/scraper/download]', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
