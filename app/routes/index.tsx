import { json, LoaderFunction } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import { builder, BuilderComponent } from "@builder.io/react";

type LoaderData = {
  page: any;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  // This must be inside load, since process.env is only available server side.
  builder.init(process.env.BUILDER_API_KEY || "");
  console.log(request, params);
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/",
      },
    })
    .toPromise();
  return json<LoaderData>({ page });
};

export default function Index() {
  const data = useLoaderData() as LoaderData;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <span>
        Content below hr is fetched and rendered server-side from Builder IO
      </span>
      <hr></hr>
      <BuilderComponent model="page" content={data.page}>
        <span>loading</span>
      </BuilderComponent>
    </div>
  );
}
