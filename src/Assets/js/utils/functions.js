const to_title = (string) => {
  if (!string) return string;

  let str = "";
  string.split(" ").map((s) => {
    str += " " + s[0].toUpperCase() + s.slice(1);
  });
  return str.trim();
};

export { to_title };
