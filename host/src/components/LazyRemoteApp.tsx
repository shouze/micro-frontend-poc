import React, { Suspense } from "react";
import { RemoteAppConfig } from "../types/remote-app";
import { Loader } from "./Loader";

const RemoteApp = React.lazy(() =>
  import("./RemoteApp").then((module) => ({
    default: module.RemoteApp,
  }))
);

export function LazyRemoteApp({ config }: { config: RemoteAppConfig }) {
  return (
    <Suspense fallback={<Loader/>}>
      <RemoteApp config={config} />
    </Suspense>
  );
}
