// Defined Commands
const COMMANDS = {
  clear: { func: clear, help: "usage: clear" }
};

// Global data
let coefficients = "4 8 15 16 23 42";
let promptSymbol = ">:";
let caretSymbol = "■";
let position = [];
let commandHistory = [];
let commandHistoryCursor = -1;

// IIFE for setup
(() => {
  // write initial prompt
  writePrompt();

  // Setup event listener for commands
  document.addEventListener("keydown", handleKeyPresses);

  // run startup sequence
  startup();

  // set prompt focus
  focusPrompt();
})();

function handleKeyPresses(e) {
  switch (e.key) {
    case "Enter":
      e.preventDefault();
      const input = document.getElementById("prompt-input");
      return runCommand(input.value);
    case "ArrowUp":
      e.preventDefault();
      if (commandHistoryCursor === -1 && commandHistory.length) {
        commandHistoryCursor = commandHistory.length - 1;
        return pushCommand(commandHistory[commandHistoryCursor]);
      }
      if (commandHistoryCursor > 0) {
        commandHistoryCursor--;
        return pushCommand(commandHistory[commandHistoryCursor]);
      }
      break;
    case "ArrowDown":
      e.preventDefault();
      if (commandHistoryCursor === commandHistory.length - 1) {
        commandHistoryCursor = -1;
        return pushCommand("");
      }
      if (
        commandHistoryCursor >= 0 &&
        commandHistoryCursor < commandHistory.length
      ) {
        commandHistoryCursor++;
        return pushCommand(commandHistory[commandHistoryCursor]);
      }
      break;
    default:
      break;
  }
}

// User Commands
function runCommand(cmd) {
  const parsedCmd = parseCommand(cmd);
  let response;
  commandHistory.push(cmd);

  // hide the caret
  hideCaret();

  // check for local commands
  if (COMMANDS[parsedCmd[0]]) {
    response = COMMANDS[parsedCmd[0]].func(
      parsedCmd.slice(1, parsedCmd.length)
    );
    replacePrompt();
    focusPrompt();
  } else {
    // check for remote commands
    fetch("/command", {
      method: "POST",
      body: "{\"command\": \"" + cmd.toUpperCase() + "\"}",

    }).then(
      response => response.text()
    ).then(
      html => {
        let result = html.replace(/(?:\r\n|\r|\n)/g, '<br>');
        if (result == "CLEAR") {
          clear();
        } else {
          typerWriter(result, function () {
            clearTypewriterCursors();
            replacePrompt();
            focusPrompt();
          });
        }
      }
    );
  }
}

// Startup Command
function startup() {
  // todo: add bootloader sequence or something
}
