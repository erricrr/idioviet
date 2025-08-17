export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get("text");

    if (!text || !text.trim()) {
      return new Response(JSON.stringify({ error: "Missing 'text' query param" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Google Translate TTS has a length limit (~200 chars). Idioms are short, but guard anyway.
    const trimmed = text.trim().slice(0, 200);

    const ttsUrl = new URL("https://translate.google.com/translate_tts");
    ttsUrl.searchParams.set("ie", "UTF-8");
    ttsUrl.searchParams.set("q", trimmed);
    ttsUrl.searchParams.set("tl", "vi"); // Vietnamese
    ttsUrl.searchParams.set("client", "tw-ob");
    // Speed parameter is optional and varies; omit to use upstream defaults.

    const upstream = await fetch(ttsUrl.toString(), {
      method: "GET",
      headers: {
        // Spoof typical browser headers to avoid upstream blocking
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Accept": "audio/mpeg,audio/*;q=0.9,*/*;q=0.8",
        "Referer": "https://translate.google.com/"
      }
    });

    if (!upstream.ok) {
      return new Response(JSON.stringify({ error: "Upstream TTS request failed" }), {
        status: upstream.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    const arrayBuffer = await upstream.arrayBuffer();
    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "inline; filename=\"tts.mp3\"",
        "Accept-Ranges": "bytes",
        // Absolutely disable CDN and browser caching (Netlify + browsers)
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0",
        "Pragma": "no-cache",
        "Expires": "0",
        // Netlify-specific header to prevent edge caching
        "Netlify-CDN-Cache-Control": "no-store"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Unexpected server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
