var isOpen = false;

$(document).ready(() => {
  document.onkeyup = (e) => {
    if (e.key == "Escape" && isOpen) {
      closeSuperSearch();
    }
  };

  $("body").append(injectHTML());
  $("#supersearch_main").addClass("exitSuperSearch");
  $("#supersearch_input").keyup(search);

  // Recieve messages from background
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.request == "open-supersearch") {
      if (isOpen) {
        closeSuperSearch();
      } else {
        openSuperSearch();
      }
    }
  });

  //   Enabling Search
  $(document).on("keyup", "supersearch_input", search);
});

async function openSuperSearch() {
  isOpen = true;
  console.log("Opening Supersearch", isOpen);
  $("#supersearch_main").removeClass("exitSuperSearch");
  $("#supersearch_main").addClass("showSuperSearch");

  // Input config
  $("#supersearch_input").val("");
  $("#supersearch_input").focus();
}

function closeSuperSearch() {
  isOpen = false;
  console.log("Closing Supersearch", isOpen);
  $("#supersearch_main").addClass("exitSuperSearch");
  $("#supersearch_main").removeClass("showSuperSearch");
}

function injectHTML() {
  return `
    <div id="supersearch_main">
        <input id="supersearch_input" type="text">
    </div>
    `;
}
function search(e) {
    var value = $(this).val().toLowerCase();
    console.log(value);
}
