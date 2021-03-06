const vscode = require('vscode');

const LineSeperator = /\r\n|\n|\r/;

function log(logString) {
    console.log(logString);
}

function newDocument(workspace, window, language, text) {
    workspace.openTextDocument({
        language: language,
        content: text
    }).then(function (document) {
        window.showTextDocument(document);
    });
}

function getAllRange(textEditor) {
    let document = textEditor.document;
    let allText = document.getText();
    var start = new vscode.Position(0, 0);
    var lines = allText.split(LineSeperator);
    var end = new vscode.Position(lines.length - 1, lines[lines.length - 1].length);
    var allRange = new vscode.Range(start, end);
    return allRange;
}

function replaceWithRange(textEditorEdit, range, text) {
    textEditorEdit.delete(range);
    textEditorEdit.insert(range.start, text);
}
function moveToLine(textEditor, line) {
    let linePosition = new vscode.Position(line, 0);
    textEditor.selection = new vscode.Selection(linePosition, linePosition);
    textEditor.revealRange(new vscode.Range(linePosition, linePosition), vscode.TextEditorRevealType.InCenter);
}

// exports
exports.log = log;
exports.newDocument = newDocument;
exports.getAllRange = getAllRange;
exports.replaceWithRange = replaceWithRange;
exports.moveToLine = moveToLine;
