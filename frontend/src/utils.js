function filterMissingTiles(model, presentTiles) {
  let missingTiles = new Set();
  let filteredTiles = [];
  for (let i = 0; i < model.tiles.length; i++) {
    if (!(model.tiles[i].file in presentTiles)) {
      missingTiles.add(model.tiles[i].file);
    } else {
      filteredTiles.push(model.tiles[i]);
    }
  }
  model.tiles = filteredTiles;
  return missingTiles;
}

function union(setA, setB) {
  const _union = new Set(setA);
  for (const elem of setB) {
    _union.add(elem);
  }
  return _union;
}

export { filterMissingTiles, union };
