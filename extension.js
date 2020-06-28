// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension VSCode Extensions Helper is now active!');

	let disposable = vscode.commands.registerCommand('vscode-extensions.adjust_block', function () {

		const editor = vscode.window.activeTextEditor;

		// Verifica se o editor existe
		//------------------------------
		if (!editor) {
			vscode.window.showErrorMessage("Editor does not exist");
			return;
		}

		const text = editor.document.getText(editor.selection);

		editor.edit(edit => {

			let rows = text.split('\n')
			let newText = ''

			rows.forEach((item, index) => {
				item = item.replace(/\\"/g , '\"')
				item = item.replace(/\"/g  , '\\"')
				// item = item.replace(/\t"/g , '    ')
				item = item.replace(/\$/g  , '\\$')
				item = item.replace(/\n/g  , '')
				item = item.replace(/\r/g  , '')

				for (let i = 0; i < 10; i++) {
					item = item.replace('    ', '\\t')
				}
				
				if ((index+1) !== rows.length) {
					item = '\"' + item + '\",\n'
				} else {
					item = '\"' + item + '\"'
				}
				newText = newText + item
			});

			edit.replace(editor.selection, newText);
			vscode.window.showInformationMessage('VSCode Extensions Snippets Ajusted!');

		});

	});

	context.subscriptions.push(disposable);

}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
	vscode.window.showInformationMessage('VSCode Extensions Helper - See ya');
}

module.exports = {
	activate,
	deactivate
}
