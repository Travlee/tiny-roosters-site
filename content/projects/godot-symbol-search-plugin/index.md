+++
date = "2026-04-24T13:45:28-04:00"
title = "Godot Symbol Search Plugin"
type = "projects"
description = "Plugin for the Godot Game Engine to implement VSCode's 'Go To Symbol' utility created in C++ with godot-cpp."
draft = false

[params]
    header_image = "popup_example_1png.png"
+++

## Description

This is a plugin for the [Godot Game Engine](https://godotengine.org/) created with [godot-cpp](https://github.com/godotengine/godot-cpp) that provides quick searching/gotos for all symbols in the active script file using a **currently** hardcoded keyboard shortcut: `Ctrl + Shift + O`. This is a recreation of VSCode's `Go To Symbol` utility.

## Features

*   **Quick Symbol Search**: Instant access to all symbols in the current script using `Ctrl + Shift + O`.
*   **Fuzzy Matching**: Find symbols quickly by typing just a few characters. Embrace the lazy.
*   **Live Navigation**: The script editor jumps to the symbol's location as you navigate the search list, providing an immediate preview.
*   **Reset Cursor Position**: If you cancel the search (Esc), the cursor position resets to the starting line and column.
*   **Comprehensive Symbol Extraction**: Currently parses and categorizes `func`, `var`, `const`, `signal`, and `static` symbols.
*   **Detached Script Editor Support**: Works when script editor is popped out!
*   **Symbol Cursor Go-To**: Places the caret at the exact line and column of the selected symbol.
*   **High Performance**: Built with C++ (GDExtension) for near-instant indexing and filtering, even in massive script files.

## Usage

Once the plugin is enabled, you can use the following keyboard shortcuts:

*   **Trigger the Popup**:
    *   Press `Ctrl + Shift + O` and a popup will appear, displaying a list of symbols in your active script, sorted from top to bottom.

*   **Navigate the List**:
    *   Use the arrow keys to navigate symbols. The script editor will go to the selected symbol's line as you navigate about.

*   **Select a Symbol**:
    *   Press the `Enter` key and the editor will go to the line your selected symbol is on in the Script Editor.

## Technical Details

This plugin is implemented in C++ using Godot's **GDExtension** system and the [godot-cpp](https://github.com/godotengine/godot-cpp) bindings.
- **Plugin Architecture**: Inherits from `EditorPlugin` and registers custom logic at the `EDITOR` initialization level.
- **Symbol Extraction**: Uses `regex` to parse the active `Script` resource's source code on-demand.
- **UI System**: Built using native Godot `Control` nodes (`PanelContainer`, `LineEdit`, `ItemList`) for consistent styling and low overhead. Also allows for easy style customization by editing the `godot_symbol_search_panel.tscn` scene file.
- **Input Handling**: Intercepts input events to provide a responsive, modal-like experience without interfering with other editor shortcuts.

For the deepest dive into the implementation, see {{< a href="https://github.com/Travlee/godot-symbol-search/blob/main/TECHNICAL_OVERVIEW.md" alt="GodotSymbolSearch TECHNICAL_OVERVIEW.md link" title="TECHNICAL_OVERVIEW.md">}}TECHNICAL_OVERVIEW.md{{</a>}}.

## Links
* {{<a href="https://github.com/Travlee/godot-symbol-search" title="Github Repo" alt="GitHub Repo link">}}Github Repo{{</a>}}
* {{<a href="https://github.com/Travlee/godot-symbol-search#installation" title="Install Help" alt="GitHub Repo link to install section">}}Install Help{{</a>}}
* {{<a href="https://godotengine.org/asset-library/asset/xxxx" title="Asset Library" alt="Link to Godot Asset Library">}}Godot Asset Library{{</a>}}
* {{<a href="https://github.com/Travlee/godot-symbol-search/issues" title="Report Issues" alt="Link to Github Repo Issues">}}Report Issues{{</a>}}
