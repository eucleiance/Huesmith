const vscode = require('vscode');

function activate(context) {
  console.log('Congratulations, your extension "huesmith" is now active!');

  // Register the command
  const disposable = vscode.commands.registerCommand('huesmith.updateColor', function () {
    console.log('Command huesmith.updateColor executed.');
    update('PrimaryBackground');
  });

  context.subscriptions.push(disposable);

  // Watch for configuration changes
  vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('PrimaryBackground.HexCode') || event.affectsConfiguration('PrimaryBackground.Enable')) {
      console.log('PrimaryBackground Settings Changed');
      update('PrimaryBackground');
    }
  });

  // Initial update
  update('PrimaryBackground');
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
    const updatedConfig = updateTheme(category, status(category), inputHex, currentConfig);

    vscode.workspace.getConfiguration('workbench').update('colorCustomizations', updatedConfig, vscode.ConfigurationTarget.Global);
  } catch (error) {
    console.error(`Failed to update color configuration for ${category}:`, error);
  }
}

function updateTheme(category, isEnabled, HexCode, currentColorCustomizations) {
  if (category === 'PrimaryBackground' && isEnabled === true) {
    console.log('Updating theme with:', {
      category,
      isEnabled,
      HexCode,
      currentColorCustomizations
    });
    return {
      ...currentColorCustomizations,
      "activityBar.background": HexCode,
      "sideBar.background": HexCode,
      "sideBarSectionHeader.background": HexCode,
      "statusBar.background": HexCode,
      "titleBar.activeBackground": HexCode,
      "titleBar.inactiveBackground": HexCode,
      "editor.background": HexCode,
      "editorGroupHeader.tabsBackground": HexCode,
      "editorGutter.background": HexCode,
      "tab.inactiveBackground": HexCode,
      "tab.unfocusedInactiveBackground": HexCode,
      "breadcrumb.background": HexCode,
      "panel.background": HexCode,
      "terminal.background": HexCode,
    };
  }
  return currentColorCustomizations;
}

function deactivate() { }

module.exports = {
  activate,
  deactivate
};