// Keep legacy page links on the primary Matrix domain
$w.onReady(function () {
  const rewriteLink = (value) => {
    if (!value) return value;
    return value
      .replace(/https?:\/\/facials\.matrixmassage\.net\/?/gi, "/facials-salem-wi")
      .replace(/https?:\/\/headspa\.matrixmassage\.net\/?/gi, "/japanese-head-spa-salem-wi")
      .replace(/https?:\/\/massage-near-union-grove(?:-wi)?\.matrixmassage\.net\/?/gi, "/massage-near-union-grove-wi")
      .replace(/https?:\/\/painrelief\.matrixmassage\.net\/?/gi, "/massage-therapy-services-salem-wi");
  };

  $w("Text").forEach((element) => {
    try {
      const updated = rewriteLink(element.html);
      if (updated && updated !== element.html) element.html = updated;
    } catch (error) {}
  });

  $w("Button").forEach((button) => {
    try {
      const updated = rewriteLink(button.link);
      if (updated && updated !== button.link) button.link = updated;
    } catch (error) {}
  });
});
