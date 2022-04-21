console.log("Background.js file");
// Shortcut command
// Listen for the open omni shortcut
chrome.commands.onCommand.addListener((command) => {
  console.log(command);
  if (command === "supersearch") {
    console.log("Super seach command!");

    getCurrentTab().then(async (response) => {
      await chrome.tabs.sendMessage(response.id, { request: "open-supersearch" });
    });
  }
  
});

// Get the current tab
const getCurrentTab = async () => {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

const getTabs = () => {
	chrome.tabs.query({}, (tabs) => {
        console.log("Tabs", tabs);
	});

    chrome.tabGroups.query({}, (groups) => {
        console.log("Groups", groups);
    })
}

getTabs();