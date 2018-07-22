import "./env";
import "./assets";
import "./data";
import "./html";
import "./mapbox";
import "./rollup";
import "./build";
import "./serve";
import "./default";
import "./deploy";

export const BUILD_PATH = "build";
export const makeBuildSubpath = subpath => `${BUILD_PATH}/${subpath}`;

export const BUILD_CSS_PATH = "build/css";
