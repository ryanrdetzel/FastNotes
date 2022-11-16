chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.startsWith("https://app.fastmail.com")) {
    const urlObj = new URL(tab.url);
    const [non, mail, location, id] = urlObj.pathname.split("/");

    if (id) {
      const messageId = id.split(".")[0];
      try {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            if (chrome.runtime.lastError) {
              return;
            } else {
              chrome.tabs.sendMessage(tabs[0].id, {
                messageId: messageId,
                url: urlObj.pathname,
              });
            }
          }
        );
      } catch (err) {
        console.log("err");
      }
    }
  }
});
