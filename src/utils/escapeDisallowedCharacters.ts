export function escapeDisallowedCharacters(content: string): string {
  const result: string[] = [];

  for (let i = 0; i < content.length; i++) {
    if (content.charCodeAt(i) > 127) {
      result.push(encodeURIComponent(content.charAt(i)));
    } else {
      if (content.charAt(i) === "*") {
        result.push("%2A");
      } else if (content.charAt(i) === "+") {
        result.push("%2B");
      } else if (content.charAt(i) === "%") {
        result.push("%25");
      } else {
        result.push(content.charAt(i));
      }
    }
  }

  return result.join("");
}
