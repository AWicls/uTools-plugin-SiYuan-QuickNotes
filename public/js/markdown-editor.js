// markdown-editor.js
window.easyMDE = null; // 将 easyMDE 定义为全局变量
window.reader = null; // 将 reader 定义为全局变量
window.writer = null; // 将 writer 定义为全局变量

function setEditorHeight() {
    const editor = document.querySelector('.CodeMirror');
    if (editor) {
        editor.style.height = `${window.innerHeight}px`;
    }
}

window.onload = function() {
    // 初始化 EasyMDE 编辑器
    window.easyMDE = new EasyMDE({
        element: document.getElementById('editor'),
        spellChecker: false, // 禁用拼写检查
        status: false, // 禁用状态栏
        toolbar: [
            'bold', 'italic', 'heading', '|',
            'quote', 'unordered-list', 'ordered-list', '|',
            'link', 'image', '|',
            'preview', 'side-by-side', 'fullscreen', '|',
            'guide'
        ]
    });

    // 初始化 commonmark.js
    window.reader = new commonmark.Parser();
    window.writer = new commonmark.HtmlRenderer();

    // 监听编辑器内容变化，实时渲染 Markdown
    window.easyMDE.codemirror.on('change', function() {
        var markdownText = window.easyMDE.value();
        var parsed = window.reader.parse(markdownText);
        var htmlContent = window.writer.render(parsed);
        document.getElementById('markdown-output').innerHTML = htmlContent;
    });

    // 初始设置编辑器高度
    setEditorHeight();

    // 监听窗口大小变化
    window.addEventListener('resize', setEditorHeight);
};