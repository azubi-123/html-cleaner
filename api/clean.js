module.exports = async (req, res) => {
  try {
    const { html } = req.body;

    if (!html) {
      return res.status(400).json({ error: "No HTML provided" });
    }

    // Simple clean: remove scripts, styles, noscript, excessive whitespace
    const cleaned = html
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '')
      .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '')
      .replace(/<noscript[^>]*>([\s\S]*?)<\/noscript>/gi, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/<!--[\s\S]*?-->/g, '') // remove comments
      .trim();

    // Optional: truncate if still very large
    const shortened = cleaned.substring(0, 50000);

    res.status(200).json({
      summary: shortened
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
