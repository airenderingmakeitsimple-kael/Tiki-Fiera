import { put } from '@vercel/blob';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  const filename = request.query.filename;
  if (!filename) {
    return response.status(400).json({ error: 'Filename is required' });
  }

  try {
    // Vercel Blob expects the body to be the file content
    const blob = await put(filename, request, {
      access: 'public',
    });

    return response.status(200).json(blob);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
