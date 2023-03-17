// -> local testing
// const DOMAIN = "http://127.0.0.1";
// -> server testing
// const DOMAIN = "3.132.124.203";
// -> prod
const DOMAIN = "https://shadydomain.click";
const DIR2POS = {
  "px": [1, 0, 0],
  "nx": [-1, 0, 0],
  "pz": [0, 1, 0],
  "nz": [0, -1, 0],
  "py": [0, 0, 1],
  "ny": [0, 0, -1]
};
export { DOMAIN, DIR2POS };
