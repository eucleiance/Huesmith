const vscode = require('vscode');

function activate(context) {
  console.log('Congratulations, your extension "huesmith" is now active!');

  // Register the command
  const disposable = vscode.commands.registerCommand('huesmith.updateColor', function () {
    console.log('Command huesmith.updateColor executed.');
    vscode.window.showInformationMessage('Notificasionnnn....');
  });

  context.subscriptions.push(disposable);

  // Watch for configuration changes
  const categories = ['PrimaryBackground', 'SecondaryBackground', 'PrimaryForeground', 'SecondaryForeground', 'Borders', 'punctuation'];
  categories.forEach(category => {
    registerConfigurationListener(category);
  });
}

function registerConfigurationListener(category) {
  vscode.workspace.onDidChangeConfiguration(event => {
    const hexCodeSetting = `${category}.HexCode`;
    const enableSetting = `${category}.Enable`;

    if (event.affectsConfiguration(hexCodeSetting) || event.affectsConfiguration(enableSetting)) {
      console.log(`${category} Settings Changed`);
      update(category);
    }
  });
}

function status(category) {
  const enableStatus = vscode.workspace.getConfiguration(category).get('Enable');
  console.log(`Status of ${category}:`, enableStatus);
  return enableStatus;
}

function update(category) {
  try {
    const inputHex = vscode.workspace.getConfiguration(category).get('HexCode');
    const currentConfig = vscode.workspace.getConfiguration('workbench').get('colorCustomizations') || {};
    const updatedConfig = updateTheme(category, status(category), inputHex, { ...currentConfig }); // Ensure a copy is made

    console.log('Updating configuration:', updatedConfig);

    vscode.workspace.getConfiguration('workbench').update('colorCustomizations', updatedConfig, vscode.ConfigurationTarget.Global);
  } catch (error) {
    console.error(`Failed to update color configuration for ${category}:`, error);
  }
}

function updateTheme(category, isEnabled, HexCode, currentColorCustomizations) {
  // Handle workbench color customizations
  if (keysToUpdate[category]) {
    keysToUpdate[category].forEach(key => {
      if (isEnabled) {
        currentColorCustomizations[key] = HexCode;
      } else {
        delete currentColorCustomizations[key];
      }
    });
  }

  // Handle token color customizations
  if (tokenColorKeysToUpdate[category]) {
    currentColorCustomizations["editor.tokenColorCustomizations"] = currentColorCustomizations["editor.tokenColorCustomizations"] || { "textMateRules": [] };
    tokenColorKeysToUpdate[category].forEach(rule => {
      if (isEnabled) {
        rule.settings.foreground = HexCode;
        currentColorCustomizations["editor.tokenColorCustomizations"].textMateRules.push(rule);
      } else {
        currentColorCustomizations["editor.tokenColorCustomizations"].textMateRules = currentColorCustomizations["editor.tokenColorCustomizations"].textMateRules.filter(existingRule => existingRule.scope !== rule.scope);
      }
    });
  }

  return currentColorCustomizations;
}

const keysToUpdate = {
  PrimaryBackground: [
    "activityBar.background",
    "sideBar.background",
    "sideBarSectionHeader.background",
    "statusBar.background",
    "titleBar.activeBackground",
    "titleBar.inactiveBackground",
    "editor.background",
    "editorGroupHeader.tabsBackground",
    "editorGutter.background",
    "tab.inactiveBackground",
    "tab.unfocusedInactiveBackground",
    "breadcrumb.background",
    "panel.background",
    "terminal.background",
    "minimap.background",
  ],
  SecondaryBackground: [
    "activityBar.activeBackground",
    "list.activeSelectionBackground",
    "notifications.background",
    "list.hoverBackground",
    "list.focusBackground",
    "input.background",
    "editorWidget.background",
    "tab.activeBackground",
    "menu.background",
  ],
  PrimaryForeground: [
    "list.hoverForeground",
    "list.focusForeground",
    "activityBar.foreground",
    "sideBarSectionHeader.foreground",
    "sideBarTitle.foreground",
    "list.inactiveSelectionForeground",
    "list.activeSelectionForeground",
    "list.focusForeground",
    "statusBar.foreground",
    "tab.activeForeground",
    "tab.unfocusedActiveForeground",
  ],
  SecondaryForeground: [
    "activityBar.inactiveForeground",
    "sideBar.foreground",
    "titleBar.activeForeground",
    "titleBar.inactiveForeground",
    "tab.inactiveForeground",
    "tab.unfocusedInactiveForeground",
  ],
  Borders: [
    "focusBorder",
    "activityBar.border",
    "sideBar.border",
    "sideBarSectionHeader.border",
    "statusBar.border",
    "statusBar.noFolderBorder",
    "statusBar.debuggingBorder",
    "statusBarItem.focusBorder",
    "statusBar.focusBorder",
    "titleBar.border",
    "menubar.selectionBorder",
    "menu.selectionBorder",
    "menu.border",
    "input.border",
    "inputOption.activeBorder",
    "terminal.border",
    "panel.border",
    "editorGroupHeader.border",
    "editorGroupHeader.tabsBorder",
    "tab.border",
    "tab.activeBorder",
    "tab.activeBorderTop",
    "tab.hoverBorder",
    "pickerGroup.border",
    "debugToolBar.border",
    "notificationToast.border",
    "notifications.border",
    "list.focusoutline",
  ]
};

const tokenColorKeysToUpdate = {
  punctuation: [
    {
      "scope": "punctuation.separator",
      "settings": {
        "foreground": null // Placeholder for hex code
      }
    }
  ],
  // Add more token customizations as needed
};

function deactivate() { }

module.exports = {
  activate,
  deactivate
};