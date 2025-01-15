use tauri::{
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    AppHandle, Manager, Runtime, WebviewUrl, WebviewWindowBuilder, WindowEvent,
};
use tauri_plugin_positioner::{Position, WindowExt};

/// 创建系统托盘图标和系统托盘菜单
pub fn create_tray<R: Runtime>(app: &AppHandle<R>) -> tauri::Result<()> {
    let webview_window =
        WebviewWindowBuilder::new(app, "system-tray", WebviewUrl::App("/tray".into()))
            .inner_size(80., 350.)
            .always_on_top(true)
            .resizable(false)
            .decorations(false)
            .skip_taskbar(true)
            .visible(false)
            .build()?;

    webview_window.clone().on_window_event(move |event| {
        println!("{:#?}", event);
        if let WindowEvent::Focused(false) = event {
            webview_window.hide().ok();
        }
    });

    TrayIconBuilder::with_id("main")
        .tooltip("Kit Tool")
        .icon(app.default_window_icon().unwrap().clone())
        .on_tray_icon_event(|tray, event| {
            tauri_plugin_positioner::on_tray_event(tray.app_handle(), &event);

            match event {
                TrayIconEvent::Click {
                    button: MouseButton::Left,
                    button_state: MouseButtonState::Up,
                    ..
                } => {
                    let app = tray.app_handle();
                    if let Some(window) = app.get_window("main") {
                        let _ = window.show();
                        let _ = window.set_focus();
                    }
                }
                TrayIconEvent::Click {
                    button: MouseButton::Right,
                    button_state: MouseButtonState::Up,
                    ..
                } => {
                    position_tray(tray.app_handle()).ok();
                }
                _ => {}
            }
        })
        .build(app)?;
    Ok(())
}

fn position_tray<R: Runtime>(app: &AppHandle<R>) -> tauri::Result<()> {
    if let Some(window) = app.get_webview_window("system-tray") {
        window.move_window(Position::TrayLeft)?;
        window.show()?;
        window.set_focus()?;
    }

    Ok(())
}
