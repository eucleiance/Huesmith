const vscode = require('vscode');

function activate(context) {
  console.log('Congratulations, your extension "huesmith" is now active!');

  // Register the command
  const disposable = vscode.commands.registerCommand('huesmith.updateColor', function () {
    console.log('Command huesmith.updateColor executed.');
    updateColorConfiguration();
  });

  context.subscriptions.push(disposable);

  // Watch for configuration changes
  vscode.workspace.onDidChangeConfiguration(event => {
    if (event.affectsConfiguration('huesmith.PrimaryBackground')) {
      console.log('PrimaryBackground configuration changed.');
      updateColorConfiguration();
    }
  });

  // Initial update
  updateColorConfiguration();
}

function updateColorConfiguration() {
  const config = vscode.workspace.getConfiguration('huesmith');
  const primaryBackground = config.get('PrimaryBackground', '#0d0d0d');

  console.log('PrimaryBackground value:', primaryBackground);

  // Get the current workbench color customizations
  const currentColorCustomizations = vscode.workspace.getConfiguration('workbench').get('colorCustomizations') || {};

  console.log('Current workbench.colorCustomizations:', currentColorCustomizations);

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
  vscode.workspace.getConfiguration('workbench').update('colorCustomizations', updatedColorCustomizations, vscode.ConfigurationTarget.Global)
    .then(() => {
      console.log('Updated workbench.colorCustomizations in settings.json');
    }, error => {
      console.error('Failed to update workbench.colorCustomizations:', error);
    });
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};