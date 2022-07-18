import { AsCloud } from "./as-cloud";
import { TotalConfig } from "./types";
import { CloudOptions as LafCloudOpt } from "laf-client-sdk";

function init(config: TotalConfig): AsCloud {
  return new AsCloud(config)
}


export {
  init,
  AsCloud,
}