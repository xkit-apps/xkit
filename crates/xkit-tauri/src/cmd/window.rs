use tauri::{LogicalSize, Manager};

#[tauri::command]
pub fn set_window_size(app_handle: tauri::AppHandle) {
    if let Some(window) = app_handle.get_window("main") {
        window.set_size(LogicalSize::new(800, 490)).ok();
    }
}
