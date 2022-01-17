import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CollectionsOverview from "./../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import { updateCollections } from "../../redux/shop/shop.actions";

import WithSpinner from "../../components/with-spinner/with-spinner.component";

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";


const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = (props) => {
  const { match, updateCollections } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = () => {
      const collectionRef = firestore.collection("collections");

      return collectionRef.onSnapshot(async (snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        setLoading(false);
      });
    };

    fetchCollections();
    return () => fetchCollections();
  }, []);

  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} render={props => (
        <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
      )} />
      <Route path={`${match.path}/:collectionId`} render={props => (
        <CollectionPageWithSpinner isLoading={loading} {...props} />
      )} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
