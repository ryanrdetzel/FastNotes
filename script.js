chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.messageId) {
    const vCardMessageContainer =
      document.getElementsByClassName("v-MessageCard");
    const messageId = request.messageId;

    // On threads there are multiple messageCards
    if (vCardMessageContainer && vCardMessageContainer.length > 0) {
      let existingNotes = document.getElementById("FastNotes");

      if (!existingNotes) {
        existingNotes = document.createElement("textarea");
        existingNotes.setAttribute("id", "FastNotes");
        existingNotes.setAttribute("placeholder", "Notes go here");

        existingNotes.style.cssText +=
          "color:black;border:0;width:804px;height:80px;margin-left:20px;padding:8px;border: 1px solid var(--ui-card-color-border);border-radius: 8px;box-shadow: var(--ui-card-shadow";

        existingNotes.addEventListener("keyup", (event) => {
          const value = event.currentTarget.value;
          const payload = {
            value,
            ts: Date.now(),
          };
          chrome.storage.sync.set({ [messageId]: payload });
        });

        const newContent = document.createTextNode("");
        existingNotes.appendChild(newContent);
        vCardMessageContainer[0].insertAdjacentElement(
          "beforebegin",
          existingNotes
        );
      }

      /* Get any existing message out of localstore */
      chrome.storage.sync.get([messageId], function (result) {
        const payload = result[messageId] || {};
        existingNotes.innerHTML = payload.value || "";
      });
    }
  }
});
