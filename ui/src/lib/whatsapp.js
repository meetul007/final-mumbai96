export function waLink(rawPhone) {
  if (!rawPhone) return null;
  const digits = String(rawPhone).replace(/[^0-9]/g, "");
  let normalized = digits;
  if (digits.length === 10) {
    normalized = "91" + digits;
  } else if (digits.length === 11 && digits.startsWith("0")) {
    normalized = "91" + digits.slice(1);
  }
  return `https://wa.me/${normalized}`;
}
