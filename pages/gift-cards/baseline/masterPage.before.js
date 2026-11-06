// Global footer and navigation: consolidated main-domain SEO links
$w.onReady(function () {
  try {
    $w("#text33").html = '<p style="margin:0;text-align:center;color:#ffffff;font-size:14px;line-height:1.55;">© 2026 Matrix Massage &amp; Bodywork · Salem Lakes, WI<br>(262) 939-9325 · 24804 75th St, Salem, WI 53168<br><a href="/massage-therapy-services-salem-wi" target="_self" style="color:#ffffff;text-decoration:underline;">Massage Therapy</a> · <a href="https://www.matrixmassage.net/spa-and-beauty-services-salem-wi/facials-salem-wi" target="_self" style="color:#ffffff;text-decoration:underline;">Custom Facials</a> · <a href="/japanese-head-spa-salem-wi" target="_self" style="color:#ffffff;text-decoration:underline;">Japanese Head Spa</a></p>';
  } catch (error) { console.error("Footer primary links failed", error); }

  try {
    $w("#text44").html = '<p style="margin:0;text-align:center;color:#ffffff;font-size:14px;line-height:1.6;"><em>One Salem studio serving Salem Lakes, Paddock Lake, Bristol, Twin Lakes, Kenosha County, Union Grove and nearby Antioch, Illinois.</em><br><br>Plan <a href="/massage-near-union-grove-wi" target="_self" style="color:#ffffff;text-decoration:underline;">massage near Union Grove</a>, <a href="/facials-near-antioch-il" target="_self" style="color:#ffffff;text-decoration:underline;">facials near Antioch</a>, <a href="/japanese-head-spa-near-bristol-wi" target="_self" style="color:#ffffff;text-decoration:underline;">Japanese Head Spa near Bristol</a>, or <a href="/spa-services-near-paddock-lake-wi" target="_self" style="color:#ffffff;text-decoration:underline;">spa services near Paddock Lake</a>. All appointments are provided at Matrix Massage &amp; Bodywork in Salem, Wisconsin.</p>';
  } catch (error) { console.error("Footer local links failed", error); }

  const rewriteMenuLink = (value) => {
    if (!value) return value;
    return value
      .replace(/^(?:https?:\/\/(?:www\.)?matrixmassage\.net)?\/(?:spa-and-beauty-services-salem-wi\/)?facials-salem-wi(?=\/?$|[?#])/i, "https://www.matrixmassage.net/spa-and-beauty-services-salem-wi/facials-salem-wi")
      .replace(/\/spa-and-beauty-services-salem-wi\/head-spa-salem-wi/gi, "/japanese-head-spa-salem-wi")
      .replace(/https?:\/\/facials\.matrixmassage\.net\/?/gi, "https://www.matrixmassage.net/spa-and-beauty-services-salem-wi/facials-salem-wi")
      .replace(/https?:\/\/headspa\.matrixmassage\.net\/?/gi, "/japanese-head-spa-salem-wi");
  };

  const remapItems = (items) => (items || []).map((item) => {
    const updated = { ...item, link: rewriteMenuLink(item.link) };
    if (Array.isArray(item.children)) updated.children = remapItems(item.children);
    if (Array.isArray(item.menuItems)) updated.menuItems = remapItems(item.menuItems);
    return updated;
  });

  try {
    const mainMenu = $w("#horizontalMenu3");
    mainMenu.menuItems = remapItems(mainMenu.menuItems);
  } catch (error) { console.error("Navigation hub links failed", error); }
});