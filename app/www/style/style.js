const Style = {
  colors: {
  primary: { a: 0x450A65, b: 0x68099D, c: 0x550E7C, d: 0x2F0446,e: 0x1C0229, f:0x0C0012 },
  secondary1: { a: 0x790647, b: 0xBC016B, c: 0x950958, d: 0x550030, e: 0x32001C },
  secondary2: { a: 0x608D08, b: 0x92DB01, c: 0x77AE0A, d: 0x426200, e: 0x273A00 },
  complement: { a: 0x979708, b: 0xEBEB02, c: 0xBABA0B, d: 0x696900, e: 0x3E3E00 }
  }
};
const hex = function(color) {
  return '#' + color.toString(16);
}
