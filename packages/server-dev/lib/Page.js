/*
  Copyright 2020-2022 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import React from 'react';
import Client from '@lowdefy/client';

import RestartingPage from './RestartingPage.js';
import usePageConfig from './utils/usePageConfig.js';

const Page = ({ auth, Components, config, pageId, resetContext, router, types }) => {
  const { data: pageConfig } = usePageConfig(pageId, router.basePath);

  if (!pageConfig) {
    router.replace(`/404`);
    return '';
  }
  if (resetContext.restarting) {
    return <RestartingPage />;
  }
  return (
    <Client
      auth={auth}
      Components={Components}
      config={{
        ...config,
        pageConfig,
      }}
      resetContext={resetContext}
      router={router}
      stage="dev"
      types={types}
      window={window}
    />
  );
};

export default Page;
