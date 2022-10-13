export function flatten(tree, acc, branch = [], build) {
  return Object.entries(tree).reduce(
    (a, [key, val]) =>
      typeof val !== 'object'
        ? build(a, branch, key, val)
        : flatten(val, a, branch.concat(key), build),
    acc
  );
}
