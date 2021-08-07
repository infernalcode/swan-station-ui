function clear() {
  const terminal = document.getElementById("terminal-content");
  while (terminal.firstChild) {
    terminal.removeChild(terminal.lastChild);
  }

  writePrompt();
  return true;
}
