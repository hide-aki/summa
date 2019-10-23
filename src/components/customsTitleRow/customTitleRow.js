import React, { useState, useEffect } from 'react';

import { CustomCol, CustomRow } from '@pleedtech/pt-components';
import isNil from 'lodash/isNil';

const CustomTitleRow = (props) => {
  const { title, isVisibleTitle, className, classNameH3, isVisible } = props;
  let content = <div />;
  if (isVisible === true) {
    content = (
      <CustomRow className={isNil(className) ? 'tittleRow' : className}>
        <CustomCol lg="1" md="1" />
        <CustomCol lg="10" md="10" sm="12">
          {isVisibleTitle && (
            <h3 className={isNil(classNameH3) ? 'tituloVista' : classNameH3}>
              {title}
            </h3>
          )}
        </CustomCol>
        <CustomCol lg="1" md="1" />
      </CustomRow>
    );
  }

  return content;
};

export default CustomTitleRow;
