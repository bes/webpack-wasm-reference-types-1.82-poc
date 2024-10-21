use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = Stuff)]
pub struct StuffJs {
    value: String,
}

#[wasm_bindgen(js_class = Stuff)]
impl StuffJs {
    // Using &JsValue forces reference types
    #[wasm_bindgen(js_name = refThing)]
    pub fn ref_thing(&self, value: &JsValue) {
        todo!()
    }
}
