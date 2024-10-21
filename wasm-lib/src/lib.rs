#![allow(clippy::too_many_arguments)]

use tracing::Level;
use tracing_wasm::{ConsoleConfig, WASMLayerConfigBuilder};
use wasm_bindgen::prelude::*;

mod stuff;

#[wasm_bindgen(start)]
pub fn start() {
    // Setup the panic hook to print to console.error
    console_error_panic_hook::set_once();

    // For logging & tracing use tracing-wasm (and tracing)
    let config = WASMLayerConfigBuilder::new()
        .set_console_config(ConsoleConfig::ReportWithConsoleColor)
        .set_max_level(Level::INFO)
        .set_report_logs_in_timings(false)
        .build();
    tracing_wasm::set_as_global_default_with_config(config);
}
