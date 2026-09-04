import { getTestState, getTestResult, countBusinesses } from '@/lib/scraper-service';

export async function GET(request, { params }) {
  const { testId } = await params;

  try {
    const state = await getTestState(testId);

    if (!state) {
      return Response.json({ error: 'Test not found' }, { status: 404 });
    }

    // Build response with progress info
    const response = {
      testId: state.testId,
      location: state.location,
      category: state.category,
      status: state.status,
      startedAt: state.startedAt,
      completedAt: state.completedAt,
      error: state.error,
      resultCount: state.resultCount,
    };

    // Include result data when completed
    if (state.status === 'completed') {
      const result = await getTestResult(testId);
      response.result = result;
    }

    return Response.json(response);
  } catch (err) {
    console.error('[api/scraper/test-status]', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
