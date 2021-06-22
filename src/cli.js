// Defined Commands
const COMMANDS = {
  clear: { func: clear, help: "usage: clear" },
  help: { func: joinWriter(help, listWriter), help: "usage: help [<command>]" },
  failure: { func: joinWriter(failure, typerWriter), help: "usage: Enter the coefficients of the Valenzetti Equation" },
  logo: { func: joinWriter(logo, textWriter, "text-align: center"), help: "usage: logo"},
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
  commandHistory.push(cmd);
  const parsedCmd = parseCommand(cmd);
  let response;

  // hide the caret
  hideCaret();

  // Just check for the reset code
  if (cmd == coefficients) {
    response = COMMANDS.clear.func();
  } else if (COMMANDS[parsedCmd[0]]) {
    if (parsedCmd.length > 1 && parsedCmd[1] === "-h") {
      response = COMMANDS.help.func([parsedCmd[0]]);
    } else {
      response = COMMANDS[parsedCmd[0]].func(
        parsedCmd.slice(1, parsedCmd.length)
      );
    }
  } else {
    textWriter("Command not found");
  }
  if (!response) {
    replacePrompt();
  }
  focusPrompt();
}

// Startup Command
function startup() {
  // todo: add bootloader sequence or something
}
