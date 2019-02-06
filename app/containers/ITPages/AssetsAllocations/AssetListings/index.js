import React from 'react';

/* AssetLists */
import Lists from './Lists';

export class AssetsComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      assetid: '',
      assetname: '',
      assetcost: '',
      unitavailable: '',
      descr: '',
    };
  }
  // Set the Asset ID from the Asset List component
  setAssetList = (assetid, assetname, assetcost, unitavailable, descr) => {
    // console.log(access);
    this.setState({
      assetid,
      assetname,
      assetcost,
      unitavailable,
      descr,
    });
    console.log(assetid, assetname, assetcost, unitavailable, descr);
  }
  render() {
    return (
      <Lists selectAssets={this.setAssetList} />
    );
  }
}

export default AssetsComponent;
