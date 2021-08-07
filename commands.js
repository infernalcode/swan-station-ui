function clear() {
  const prompts = document.getElementById("terminal-content").childNodes;
  for (let prompt of prompts) {
    prompt.remove();
  }
  writePrompt();
  return true;
}