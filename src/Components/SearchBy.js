import React, { useState,useEffect} from 'react';
import _ from "lodash"
import RequiredRows from './RequiredRows'
function Pagination({productGroups}){
  const groupsList = Object.entries(productGroups)
  const [searchWord, setSearchWord] = useState("");
  const [groupsToDisplay, setGroupsToDisplay] = useState(groupsList);

  const searchHandler = (event) => {
    setSearchWord(event.target.value.toLowerCase());
  };

  useEffect(() => {
    if (searchWord) {
      const searchedGroupsList = groupsList.filter((productGroup) =>
        productGroup[0].toLowerCase().includes(searchWord)
      );
      setGroupsToDisplay(searchedGroupsList);
    }
  }, [searchWord]);

  return (
    <div>
      {productGroups.length !== 0 && (
        <div>
          <input
            className="form-control"
            type="text"
            onChange={searchHandler}
            placeholder="Search"
          />
        </div>
      )}
      {searchWord && (
          <RequiredRows groupsList={groupsToDisplay} />
      )}

      {searchWord && groupsToDisplay.length === 0 && (
        <h2 className='text-danger'>No products Found</h2>
      )}

      {!searchWord && <RequiredRows groupsList={groupsList} />}
    </div>
  );
};


export default Pagination;
