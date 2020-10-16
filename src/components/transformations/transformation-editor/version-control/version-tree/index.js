import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tree from 'react-d3-tree';
import TreeNode from './tree-node';
import buildVersionTree from 'helpers/buildVersionTree';

const useStyles = makeStyles(theme => ({
  container: {
    height: '50%',
    overflow: 'auto',
    padding: '10pt',
    borderBottom: '1px solid rgba(0, 0, 0, 0.15)',
  }
}));

export default function VersionTree(props) {
  const classes = useStyles();
  const [tree, setTree] = React.useState(null);

  React.useEffect(() => {
    let tree = buildVersionTree(props.versions);
    setTree(tree);
  }, [props.versions]);

  React.useEffect(() => {
    let tree = document.querySelector('.rd3t-tree-container>svg>g');
    if (tree){
      setTimeout(() => {
        let treeHeight = tree.getBBox().height;
        let svg = document.querySelector('.rd3t-tree-container>svg');
        svg.setAttribute('height', treeHeight);
      }, 500)
    }
  });

  return (
    <div className={classes.container}>
      {
        tree ? (
          <Tree
            data={buildVersionTree(props.versions)}
            orientation="vertical"
            zoomable={false}
            collapsible={false}
            allowForeignObjects={true}
            translate={{ x: 20, y: 20 }}
            nodeLabelComponent={{
              render: <TreeNode />,
              foreignObjectWrapper: {
                y: -35,
                x: 10,
                width: '90%'
              }
            }}
          />
        ) : ""
      }
    </div>
  );
};
