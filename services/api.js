// services/api.js
// Frontend helper to upload file and receive JSON result.
// For the hackathon/demo we will call a mock endpoint at /api/transcribe
// Accepts a progress callback: onProgress(percent)

export async function uploadFileForTranscription(file, onProgress = () => {}) {
  // Build form data
  const fd = new FormData();
  fd.append("file", file);

  // Use fetch to POST to relative endpoint
  // Note: In production replace with actual backend URL
  const resp = await fetch("/api/transcribe", {
    method: "POST",
    body: fd,
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(Server error: ${text || resp.status});
  }

  // We'll assume server streams progress or returns final json.
  // For our mock, server returns JSON directly:
  const data = await resp.json();

  // Simulate incremental progress updates for UI polish:
  onProgress(90);
  await new Promise((r) => setTimeout(r, 300)); // small pause
  onProgress(100);

  return data;
}