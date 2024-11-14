// theme-switcher.js
document.addEventListener('DOMContentLoaded', function() {
    var darkThemeLink = document.createElement('link');
    darkThemeLink.rel = 'stylesheet';
    darkThemeLink.id = 'dark-theme-link';
    darkThemeLink.href = 'public/css/dark-theme.css';

    // 检测系统主题偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.head.appendChild(darkThemeLink);
    }

    // 监听系统主题变化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (e.matches) {
            document.head.appendChild(darkThemeLink);
        } else {
            var darkTheme = document.getElementById('dark-theme-link');
            if (darkTheme) {
                darkTheme.remove();
            }
        }
        // 重新渲染编辑器
        refreshEditor();
    });

    // 切换主题函数
    function toggleTheme() {
        var darkTheme = document.getElementById('dark-theme-link');
        if (darkTheme) {
            darkTheme.remove();
        } else {
            document.head.appendChild(darkThemeLink);
        }
        // 重新渲染编辑器
        refreshEditor();
    }

    // 重新渲染编辑器
    function refreshEditor() {
        if (window.easyMDE) {
            window.easyMDE.codemirror.refresh();
        }
    }
});