import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

import configCreator from "./webpack-config.debug";

const nodeArguments = process.argv.slice(3);

const serverEnv = process.argv[2]!;

let listenAddress = "localhost";
let bindAddress = listenAddress;
let allowedHosts = "auto";
if (nodeArguments.length > 0) {
    listenAddress = nodeArguments[0]!;
    bindAddress = "0.0.0.0";
    if (listenAddress === "host.docker.internal") {
        allowedHosts = "all";
    }
}

const config = configCreator({
    [serverEnv]: true,
    proxy: true,
    listenAddress: listenAddress,
});

new WebpackDevServer(
    {
        client: {
            overlay: false,
        },
        hot: true,
        historyApiFallback: true,
        host: bindAddress,
        port: 8101,
        allowedHosts,
    },
    webpack(config),
).startCallback(() => {
    console.log("app");
});
