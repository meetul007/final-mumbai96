import { getBatchState, getCategoryResult, listBatches } from '@/lib/scraper-service';

export async function GET(request, { params }) {
  try {
    const { batchId } = await params;

    // If no batchId, return list of all batches
    if (!batchId || batchId === 'all') {
      const batches = await listBatches();
      return Response.json({ batches });
    }

    const state = await getBatchState(batchId);

    if (!state) {
      return Response.json({ error: 'Batch not found' }, { status: 404 });
    }

    const completedCount = state.categories.filter((c) => c.status === 'completed').length;
    const failedCount = state.categories.filter((c) => c.status === 'failed').length;
    const runningCount = state.categories.filter((c) => c.status === 'running').length;
    const pendingCount = state.categories.filter((c) => c.status === 'pending').length;
    const total = state.categories.length;

    return Response.json({
      ...state,
      progress: {
        total,
        completed: completedCount,
        failed: failedCount,
        running: runningCount,
        pending: pendingCount,
        percent: total > 0 ? Math.round(((completedCount + failedCount) / total) * 100) : 0,
      },
    });
  } catch (err) {
    console.error('[api/scraper/status]', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
