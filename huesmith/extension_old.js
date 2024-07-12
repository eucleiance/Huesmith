const vscode = require('vscode');

function activate(context) {
  console.log('Congratulations, your extension "huesmith" is now active!');

  // Register the command
  const disposable = vscode.commands.registerCommand('huesmith.updateColor', function () {
    console.log('Command huesmith.updateColor executed.');
    // updateColorConfiguration();
    update('PrimaryBackground');
  });

  context.subscriptions.push(disposable);

  // Watch for configuration changes
  vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('PrimaryBackground.HexCode') || event.affectsConfiguration('PrimaryBackground.Enable')) {
      console.log('PrimaryBackground configuration changed.');
      update('PrimaryBackground');
    }
  });

  // Initial update
  // updateColorConfiguration();
  update('PrimaryBackground');
}

function updateColorConfiguration() {
  const config = vscode.workspace.getConfiguration('PrimaryBackground');
  const primaryBackground = config.get('HexCode');

  // Get the current workbench color customizations
  const currentColorCustomizations = vscode.workspace.getConfiguration('workbench').get('colorCustomizations') || {};

  // Update the color customizations with the new color
  const updatedColorCustomizations = {
    ...currentColorCustomizations,
    "activityBar.background": primaryBackground,
    "sideBar.background": primaryBackground,
    "sideBarSectionHeader.background": primaryBackground,
    "statusBar.background": primaryBackground,
    "titleBar.activeBackground": primaryBackground,
    "titleBar.inactiveBackground": primaryBackground,
    "editor.background": primaryBackground,
    "editorGroupHeader.tabsBackground": primaryBackground,
    "editorGutter.background": primaryBackground,
    "tab.inactiveBackground": primaryBackground,
    "tab.unfocusedInactiveBackground": primaryBackground,
    "breadcrumb.background": primaryBackground,
    "panel.background": primaryBackground,
    "terminal.background": primaryBackground,
  };

  console.log('Updated workbench.colorCustomizations:', updatedColorCustomizations);

  // Update the settings with the new color customizations
  vscode.workspace.getConfiguration('workbench').update('colorCustomizations', updatedColorCustomizations, vscode.ConfigurationTarget.Global);
  // // Update the settings with the new color customizations
  // vscode.workspace.getConfiguration('workbench').update('colorCustomizations', updatedColorCustomizations, vscode.ConfigurationTarget.Global)
  //   .then(() => {
  //     console.log('Updated workbench.colorCustomizations in settings.json');
  //   }, error => {
  //     console.error('Failed to update workbench.colorCustomizations:', error);
  //   });
}

function update(category) {
  try {
    const userInput = vscode.workspace.getConfiguration(category).get('HexCode');
    const isEnabled = vscode.workspace.getConfiguration(category).get('Enable');
    const currentConfig = vscode.workspace.getConfiguration('workbench').get('colorCustomizations') || {};
    const updatedConfig = updateTheme(category, isEnabled, userInput, currentConfig);

    vscode.workspace.getConfiguration('workbench').update('colorCustomizations', updatedConfig, vscode.ConfigurationTarget.Global);
  } catch (error) {
    console.error(`Failed to update color configuration for ${category}:`, error);
  }
}

function updateTheme(category, isEnabled, HexCode, currentColorCustomizations) {
  if (category == 'PrimaryBackground') {
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