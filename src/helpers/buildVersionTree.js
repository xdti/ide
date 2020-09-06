const buildVersionTree = (versions) => {
  if (versions.length === 0){
    return null;
  }
  let current = versions[versions.length - 1];
  return [
    {
      name: `v${current.version}`,
      attributes: {
        comment: current.versionComment
      },
      nodeSvgShape: {
        shapeProps: {
          fill: '#3f51b5',
          r: 10
        }
      },
      children: buildVersionTree(versions.slice(0, versions.length - 1))
    }
  ]
}

export default buildVersionTree;
