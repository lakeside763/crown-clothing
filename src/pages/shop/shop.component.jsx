import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

// import CollectionsOverview from "./../../components/collections-overview/collections-overview.component";
import CollectionsOverviewContainer from './../../components/collections-overview/collections-overview.container';
// import CollectionPage from "../collection/collection.component";
import CollectionsPageContainer from "../collection/collection.container";

import { fetchCollectionsStart } from "./../../redux/shop/shop.actions";

// import WithSpinner from "../../components/with-spinner/with-spinner.component";

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({
  match,
  fetchCollectionsStart,
}) => {
  useEffect(() => {
    const fetchCollections = async () => {
      await fetchCollectionsStart();
    };

    fetchCollections();
  }, []);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionsPageContainer}
      />
    </div>
  );
};


const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);

// const fetchCollections = async () => {
//   const collectionRef = firestore.collection("collections");

//   collectionRef.get().then((snapshot) => {
//     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//     fetchCollectionsStart(collectionsMap);
//     setLoading(false);
//   });
// };


/* return (
  <div className="shop-page">
    <Route
      exact
      path={`${match.path}`}
      render={(props) => (
        <CollectionsOverviewWithSpinner
          isLoading={isCollectionFetching}
          {...props}
        />
      )}
    />
    <Route
      path={`${match.path}/:collectionId`}
      render={(props) => (
        <CollectionPageWithSpinner
          isLoading={!isCollectionsLoaded}
          {...props}
        />
      )}
    />
  </div>
); */
