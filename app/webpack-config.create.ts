import path from "path";

import webpack, { type WebpackPluginInstance } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import WarningsToErrorsPlugin from "warnings-to-errors-webpack-plugin";
import type { WebpackConfiguration } from "webpack-cli";

const nodeModulesPath = path.join(__dirname, "../", "node_modules");

export const createConfigFactory = () => {
    return (debug: boolean) =>
        (env: {}): WebpackConfiguration => {
            const srcPath = path.join(__dirname, "src/main/js");

            const entry = {
                main: [path.join(srcPath, "main.tsx")],
            };

            const swcOptions = {
                minify: debug,
            };

            const module: webpack.ModuleOptions = {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /node_modules\/(?!reselect)/,
                        use: {
                            loader: "swc-loader",
                            options: swcOptions,
                        },
                    },
                    {
                        test: /\.tsx?$/,
                        exclude: /node_modules\/(?!reselect)/,
                        use: {
                            loader: "swc-loader",
                            options: swcOptions,
                        },
                    },
                    {
                        // Process source maps included in transpiled ts-files
                        enforce: "pre",
                        test: /\.js$/,
                        loader: "source-map-loader",
                    },
                    {
                        test: /^((?!\.module).)*css$/,
                        use: [debug ? "style-loader" : MiniCssExtractPlugin.loader, { loader: "css-loader" }],
                    },
                    {
                        test: /^((?!\.module).)*less$/,
                        use: [
                            debug ? "style-loader" : MiniCssExtractPlugin.loader,
                            { loader: "css-loader" },
                            { loader: "less-loader", options: { lessLogAsWarnOrErr: true } },
                        ],
                    },
                    {
                        test: /\.module\.css$/,
                        use: [
                            debug ? "style-loader" : MiniCssExtractPlugin.loader,
                            {
                                loader: "css-loader",
                                options: {
                                    modules: {
                                        namedExport: true,
                                        exportLocalsConvention: "camelCaseOnly",
                                        localIdentName: "[name]__[local]__[hash:base64:5]",
                                        localIdentHashSalt: "afskajsf",
                                    },
                                    importLoaders: 0,
                                },
                            },
                        ],
                    },
                    {
                        test: /\.module\.less$/,
                        use: [
                            debug ? "style-loader" : MiniCssExtractPlugin.loader,
                            {
                                loader: "css-loader",
                                options: {
                                    modules: {
                                        namedExport: true,
                                        exportLocalsConvention: "camelCaseOnly",
                                        localIdentName: "[name]__[local]__[hash:base64:5]",
                                        localIdentHashSalt: "laksfalsf",
                                    },
                                    importLoaders: 0,
                                },
                            },
                            { loader: "less-loader", options: { lessLogAsWarnOrErr: true } },
                        ],
                    },
                    {
                        test: /\.woff(2)?$/,
                        type: "asset/resource",
                    },
                    {
                        test: /\.(ttf|eot|svg|mp4)$/,
                        type: "asset/resource",
                    },
                    {
                        test: /\.(png|jpg)$/,
                        type: "asset/resource",
                    },
                    {
                        test: /\.(fsh|vsh|njk)$/,
                        type: "asset/source",
                    },
                    {
                        type: "javascript/auto",
                        test: /\.mjs$/,
                        include: /node_modules/,
                    },
                ],
            };

            function getWebpackPluginFilename(filename: string) {
                if (debug) {
                    return filename;
                }
                return `../${filename}`;
            }

            const plugins: WebpackPluginInstance[] = [];

            plugins.push(
                new HtmlWebpackPlugin({
                    inject: true,
                    minify: false,
                    title: "abc",
                    template: path.join(srcPath, "index.html"),
                    filename: getWebpackPluginFilename("index.html"),
                }),
            );
            plugins.push(new WarningsToErrorsPlugin());

            plugins.push(
                new MiniCssExtractPlugin({
                    filename: debug ? "[name].css" : "[contenthash].css",
                    chunkFilename: debug ? "[name].css" : "[chunkhash].css",
                }),
            );
            plugins.push(
                new ForkTsCheckerWebpackPlugin({
                    typescript: {
                        memoryLimit: 2048, // MiB
                    },
                }),
            );

            if (!debug) {
                plugins.push(
                    new webpack.SourceMapDevToolPlugin({
                        filename: "[file].map",
                        append: false,
                    }),
                );
            }

            return {
                target: "web",
                mode: debug ? "development" : "production",
                devtool: debug ? "source-map" : undefined,
                entry: entry,
                resolve: {
                    extensions: [".js", ".tsx", ".ts"],
                    modules: [srcPath, "../node_modules", "src/main/js"],
                },
                resolveLoader: {
                    modules: [nodeModulesPath],
                },
                output: {
                    path: path.join(__dirname, "build/webpack/js"),
                    publicPath: debug ? "/" : "/js/",
                    filename: debug ? "[name].js" : "[chunkhash].js",
                    chunkFilename: debug ? "[name].js" : "[chunkhash].js",
                },
                module: module,
                plugins: plugins,
                devServer: {
                    client: {
                        overlay: false,
                    },
                },
                experiments: {
                    asyncWebAssembly: true,
                },
            };
        };
};
