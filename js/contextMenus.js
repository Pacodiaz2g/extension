chrome.contextMenus.create({
  "title": "Decoder",
  "contexts": ["browser_action"],
  "onclick": (info, tab) => {
    chrome.tabs.create({
      url: "decoder.html?q="
    })
  }
});
chrome.contextMenus.create({
  "title": "Change URL parameters",
  "contexts": ["browser_action"],
  "onclick": (info, tab) => {
    chrome.tabs.create({
      url: "param.html?q=" + btoa(tab.url)
    })
  }
});
chrome.contextMenus.create({
  "title": "Clear Clipboard",
  "contexts": ["browser_action"],
  "onclick": (info, tab) => {
    var clipboard = document.createElement('textarea');
    clipboard.textContent = '';
    document.body.appendChild(clipboard);
    var selection = document.getSelection();
    var range = document.createRange();
    range.selectNode(clipboard);
    selection.removeAllRanges();
    selection.addRange(range);
    var status = document.execCommand('copy');
    selection.removeAllRanges();
    document.body.removeChild(clipboard);
    notifications(status);
  }
});

function notifications(status) {
  chrome.notifications.create(
  {
    type: 'basic',
    iconUrl: "/icons/icon128.png",
    title: "clipboard",
    message: "Status: " + status,
    priority: 0,
    isClickable: false
  });
}

chrome.contextMenus.create({
  "title": "Issues type",
  "contexts": ["browser_action"],
  "onclick": (info, tab) => {
    chrome.tabs.create({
      url: "listoftest.html"
    })
  }
});

chrome.contextMenus.create({
  "title": "About",
  "contexts": ["browser_action"],
  "onclick": (info, tab) => {
    chrome.tabs.create({
      url: "https://github.com/Pacodiaz2g/Sniper-HTTP-Headers"
    })
  }
});
chrome.contextMenus.create({
  "title": "Sandbox",
  "contexts": ["browser_action"],
  "onclick": (info, tab) => {
    chrome.tabs.create({
      url: "sandbox.html"
    })
  }
});